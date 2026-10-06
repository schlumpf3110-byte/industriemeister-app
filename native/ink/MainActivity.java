package de.hqtrainer.industriemeister;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HqInkPlugin.class);
        registerPlugin(HqMicPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
