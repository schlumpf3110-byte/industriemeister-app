package de.hqtrainer.industriemeister;

import android.content.Context;
import android.media.AudioDeviceInfo;
import android.media.AudioManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.List;

/**
 * Mikrofon wählen: Bluetooth-Headsets liefern ihr Mikrofon erst, wenn die
 * Sprechverbindung (SCO/LE Audio) aktiv ist. Dieses Plugin schaltet sie vor dem
 * Zuhören ein und danach wieder aus (damit die Sprachausgabe in voller Qualität bleibt).
 */
@CapacitorPlugin(name = "HqMic")
public class HqMicPlugin extends Plugin {
    private boolean active = false;

    private AudioManager am() { return (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE); }

    private static String typeName(int t) {
        switch (t) {
            case AudioDeviceInfo.TYPE_BUILTIN_MIC: return "builtin";
            case AudioDeviceInfo.TYPE_BLUETOOTH_SCO: return "bluetooth";
            case AudioDeviceInfo.TYPE_WIRED_HEADSET: return "wired";
            case AudioDeviceInfo.TYPE_USB_HEADSET: return "usb";
            case AudioDeviceInfo.TYPE_USB_DEVICE: return "usb";
            default:
                if (Build.VERSION.SDK_INT >= 31 && t == AudioDeviceInfo.TYPE_BLE_HEADSET) return "ble";
                return "other";
        }
    }

    private static boolean isBt(int t) {
        return t == AudioDeviceInfo.TYPE_BLUETOOTH_SCO || (Build.VERSION.SDK_INT >= 31 && t == AudioDeviceInfo.TYPE_BLE_HEADSET);
    }

    /** -> { inputs: [{id, type, name}] } */
    @PluginMethod
    public void inputs(PluginCall call) {
        JSArray arr = new JSArray();
        for (AudioDeviceInfo d : am().getDevices(AudioManager.GET_DEVICES_INPUTS)) {
            String ty = typeName(d.getType());
            if ("other".equals(ty)) continue;
            JSObject o = new JSObject();
            o.put("id", d.getId());
            o.put("type", ty);
            o.put("name", String.valueOf(d.getProductName()));
            arr.put(o);
        }
        JSObject r = new JSObject();
        r.put("inputs", arr);
        call.resolve(r);
    }

    /** { id?: number, mode?: 'auto'|'builtin' } -> { routed: name|null, type } */
    @PluginMethod
    public void route(PluginCall call) {
        String mode = call.getString("mode", "auto");
        Integer id = call.getInt("id");
        AudioManager am = am();
        AudioDeviceInfo pick = null;
        if (!"builtin".equals(mode)) {
            int best = -1;
            for (AudioDeviceInfo d : am.getDevices(AudioManager.GET_DEVICES_INPUTS)) {
                if (id != null && d.getId() == id) { pick = d; break; }
                int t = d.getType();
                int score = isBt(t) ? 3 : (t == AudioDeviceInfo.TYPE_USB_HEADSET || t == AudioDeviceInfo.TYPE_WIRED_HEADSET) ? 2 : t == AudioDeviceInfo.TYPE_USB_DEVICE ? 1 : -1;
                if (id == null && score > best) { best = score; pick = d; }
            }
        }
        JSObject r = new JSObject();
        if (pick == null || !isBt(pick.getType())) {
            // Kabel-/USB-Headsets nimmt Android von selbst; Gerätemikrofon: nichts umschalten
            release();
            r.put("routed", pick == null ? null : String.valueOf(pick.getProductName()));
            r.put("type", pick == null ? "builtin" : typeName(pick.getType()));
            call.resolve(r);
            return;
        }
        boolean ok = false;
        try {
            am.setMode(AudioManager.MODE_IN_COMMUNICATION);
            if (Build.VERSION.SDK_INT >= 31) {
                List<AudioDeviceInfo> cds = am.getAvailableCommunicationDevices();
                AudioDeviceInfo target = null;
                for (AudioDeviceInfo c : cds) {
                    if (c.getType() == pick.getType() && String.valueOf(c.getProductName()).equals(String.valueOf(pick.getProductName()))) { target = c; break; }
                }
                if (target == null) for (AudioDeviceInfo c : cds) if (isBt(c.getType())) { target = c; break; }
                if (target != null) ok = am.setCommunicationDevice(target);
            } else {
                am.startBluetoothSco();
                am.setBluetoothScoOn(true);
                ok = true;
            }
        } catch (Exception e) { ok = false; }
        active = ok;
        if (!ok) { release(); }
        r.put("routed", ok ? String.valueOf(pick.getProductName()) : null);
        r.put("type", ok ? typeName(pick.getType()) : "builtin");
        // Die Sprechverbindung braucht einen Moment, bis das Headset-Mikrofon Ton liefert
        new Handler(Looper.getMainLooper()).postDelayed(() -> call.resolve(r), ok ? 900 : 0);
    }

    @PluginMethod
    public void release(PluginCall call) { release(); call.resolve(); }

    private void release() {
        try {
            AudioManager am = am();
            if (Build.VERSION.SDK_INT >= 31) am.clearCommunicationDevice();
            else if (active) { am.setBluetoothScoOn(false); am.stopBluetoothSco(); }
            am.setMode(AudioManager.MODE_NORMAL);
        } catch (Exception ignored) {}
        active = false;
    }

    @Override
    protected void handleOnDestroy() { release(); }
}
