package de.macbury.detox.playback;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.jstasks.HeadlessJsTaskRetryPolicy;
import com.facebook.react.jstasks.LinearCountingRetryPolicy;

/**
 * This service is used by PlaybackService to send current playback position to server in background
 * PlaybackService can run without main ReactApplication
 */
public class SyncPlaybackService extends HeadlessJsTaskService {
  private static final String TAG = "SyncPlaybackService";

  @Override
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      HeadlessJsTaskRetryPolicy retryPolicy = new LinearCountingRetryPolicy(3, 10000);
      return new HeadlessJsTaskConfig(
          "SyncPlaybackService",
          Arguments.fromBundle(extras),
          60000,
          true,
          retryPolicy
      );
    }
    return null;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Log.i(TAG, "Created");
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    Log.i(TAG, "Destroyed");
  }
}
