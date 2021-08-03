package de.macbury.detox.playback;

import android.os.Binder;
import android.os.Handler;

public class PlaybackServiceBinder extends Binder {
  public static final String TAG = "PlaybackServiceBinder";
  public static final String CONNECT_ACTION = " de.macbury.detox.playback.CONNECT_ACTION";
  private final Handler handler;
  public final MediaManager manager;

  public PlaybackServiceBinder(Handler handler, MediaManager manager) {
    this.handler = handler;
    this.manager = manager;
  }

  public void post(Runnable runnable) {
    handler.post(runnable);
  }
}
