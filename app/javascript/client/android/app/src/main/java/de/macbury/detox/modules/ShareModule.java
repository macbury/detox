package de.macbury.detox.modules;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ShareModule extends ReactContextBaseJavaModule {
  public ShareModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void shareUrl(String url) {
    Intent sendIntent = new Intent();
    sendIntent.setAction(Intent.ACTION_SEND);
    sendIntent.putExtra(Intent.EXTRA_TEXT, url);
    sendIntent.setType("text/plain");

    Intent shareIntent = Intent.createChooser(sendIntent, null);
    getCurrentActivity().startActivity(shareIntent);
  }

  @NonNull
  @Override
  public String getName() {
    return "MyShareModule";
  }
}
