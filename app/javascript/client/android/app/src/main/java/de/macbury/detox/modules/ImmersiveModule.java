package de.macbury.detox.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Build;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;

/**
 * https://developer.android.com/training/system-ui/immersive
 */
public class ImmersiveModule extends ReactContextBaseJavaModule {
  private final Handler uiTasks;
  private final int IMMERSIVE_MODE = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
      | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
      | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
      | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
      | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
      | View.SYSTEM_UI_FLAG_FULLSCREEN;

  private final int NORMAL_MODE = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;

  public ImmersiveModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.uiTasks = new Handler(reactContext.getMainLooper());
  }

  @ReactMethod
  public void enterImmersiveMode() {
    uiTasks.post(setFlags(IMMERSIVE_MODE));
  }

  @ReactMethod
  public void exitMode() {
    uiTasks.post(setFlags(NORMAL_MODE));
  }

  private Runnable setFlags(int visibility) {
    return new Runnable() {
      @Override
      public void run() {
        View decorView = getCurrentActivity().getWindow().getDecorView();
        decorView.setSystemUiVisibility(visibility);
      }
    };
  }

  @NonNull
  @Override
  public String getName() {
    return "ImmersiveModule";
  }
}
