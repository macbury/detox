package de.macbury.detox.playback;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import com.google.android.exoplayer2.ui.PlayerNotificationManager;

public class PlaybackService extends Service implements PlayerNotificationManager.NotificationListener {
  private static final String TAG = "PlaybackService";
  private Handler handler;
  private MediaManager manager;

  public PlaybackService() {
    this.handler = new Handler();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    this.manager = new MediaManager(getApplicationContext(), this);
    Log.i(TAG, "Created");
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    this.manager.dispose();
    Log.i(TAG, "Destroyed");
  }

  @Override
  public IBinder onBind(Intent intent) {
    if (PlaybackServiceBinder.CONNECT_ACTION.equals(intent.getAction())) {
      return new PlaybackServiceBinder(handler, manager);
    } else {
      throw new UnsupportedOperationException("Not yet implemented");
    }
  }

  @Override
  public void onNotificationCancelled(int notificationId, boolean dismissedByUser) {
    stopSelf();
  }

  @Override
  public void onNotificationPosted(int notificationId, Notification notification, boolean ongoing) {
    startForeground(notificationId, notification);
  }
}