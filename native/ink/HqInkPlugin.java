package de.hqtrainer.industriemeister;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.common.model.RemoteModelManager;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.digitalink.DigitalInkRecognition;
import com.google.mlkit.vision.digitalink.DigitalInkRecognitionModel;
import com.google.mlkit.vision.digitalink.DigitalInkRecognitionModelIdentifier;
import com.google.mlkit.vision.digitalink.DigitalInkRecognizer;
import com.google.mlkit.vision.digitalink.DigitalInkRecognizerOptions;
import com.google.mlkit.vision.digitalink.Ink;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

/** Handschrift offline erkennen: Stiftstriche (Digital Ink) und Fotos (Texterkennung). */
@CapacitorPlugin(name = "HqInk")
public class HqInkPlugin extends Plugin {
    private DigitalInkRecognizer recognizer;
    private String recLang;

    private DigitalInkRecognitionModel model(String tag) throws Exception {
        DigitalInkRecognitionModelIdentifier id = null;
        try { id = DigitalInkRecognitionModelIdentifier.fromLanguageTag(tag); } catch (Exception ignored) {}
        if (id == null) throw new Exception("Sprache " + tag + " nicht verfügbar");
        return DigitalInkRecognitionModel.builder(id).build();
    }

    @PluginMethod
    public void inkStatus(PluginCall call) {
        try {
            DigitalInkRecognitionModel m = model(call.getString("lang", "de-DE"));
            RemoteModelManager.getInstance().isModelDownloaded(m)
                .addOnSuccessListener(b -> { JSObject r = new JSObject(); r.put("downloaded", b); call.resolve(r); })
                .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
        } catch (Exception e) { call.reject(String.valueOf(e.getMessage())); }
    }

    @PluginMethod
    public void inkDownload(PluginCall call) {
        try {
            DigitalInkRecognitionModel m = model(call.getString("lang", "de-DE"));
            RemoteModelManager.getInstance().download(m, new DownloadConditions.Builder().build())
                .addOnSuccessListener(v -> call.resolve())
                .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
        } catch (Exception e) { call.reject(String.valueOf(e.getMessage())); }
    }

    /** lines: [ line[ stroke[ [x,y], ... ], ... ], ... ]  ->  { lines: [text, ...] } */
    @PluginMethod
    public void recognizeInk(PluginCall call) {
        try {
            String lang = call.getString("lang", "de-DE");
            if (recognizer == null || !lang.equals(recLang)) {
                if (recognizer != null) recognizer.close();
                recognizer = DigitalInkRecognition.getClient(DigitalInkRecognizerOptions.builder(model(lang)).build());
                recLang = lang;
            }
            JSArray lines = call.getArray("lines");
            List<Ink> inks = new ArrayList<>();
            long t = 0;
            for (int i = 0; i < lines.length(); i++) {
                JSONArray line = lines.getJSONArray(i);
                Ink.Builder ib = Ink.builder();
                for (int s = 0; s < line.length(); s++) {
                    JSONArray st = line.getJSONArray(s);
                    Ink.Stroke.Builder sb = Ink.Stroke.builder();
                    for (int p = 0; p < st.length(); p++) {
                        JSONArray pt = st.getJSONArray(p);
                        sb.addPoint(Ink.Point.create((float) pt.getDouble(0), (float) pt.getDouble(1), t));
                        t += 8;
                    }
                    t += 120;
                    ib.addStroke(sb.build());
                }
                inks.add(ib.build());
            }
            String[] out = new String[inks.size()];
            next(call, inks, out, 0);
        } catch (Exception e) { call.reject(String.valueOf(e.getMessage())); }
    }

    private void next(PluginCall call, List<Ink> inks, String[] out, int i) {
        if (i >= inks.size()) {
            JSArray a = new JSArray();
            for (String s : out) a.put(s == null ? "" : s);
            JSObject r = new JSObject(); r.put("lines", a); call.resolve(r); return;
        }
        recognizer.recognize(inks.get(i))
            .addOnSuccessListener(res -> {
                out[i] = res.getCandidates().isEmpty() ? "" : res.getCandidates().get(0).getText();
                next(call, inks, out, i + 1);
            })
            .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
    }

    /** image: data-URL (JPEG/PNG)  ->  { text } */
    @PluginMethod
    public void recognizeImage(PluginCall call) {
        try {
            String d = call.getString("image", "");
            int c = d.indexOf(',');
            byte[] bytes = Base64.decode(c >= 0 ? d.substring(c + 1) : d, Base64.DEFAULT);
            Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
            if (bmp == null) { call.reject("Bild nicht lesbar"); return; }
            TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
                .process(InputImage.fromBitmap(bmp, 0))
                .addOnSuccessListener((Text text) -> { JSObject r = new JSObject(); r.put("text", text.getText()); call.resolve(r); })
                .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
        } catch (Exception e) { call.reject(String.valueOf(e.getMessage())); }
    }
}
