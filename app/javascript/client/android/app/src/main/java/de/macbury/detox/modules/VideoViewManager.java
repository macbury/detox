package de.macbury.detox.modules;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.exoplayer2.ExoPlayer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import de.macbury.detox.playback.Media;
import de.macbury.detox.playback.MediaManager;
import de.macbury.detox.playback.PlaybackService;
import de.macbury.detox.playback.PlaybackServiceBinder;

public class VideoViewManager extends SimpleViewManager<ReactVideoView> implements ServiceConnection, MediaManager.OnMediaChangeListener {
  private static final String TAG = "VideoViewManager";
  private final ArrayList<ReactVideoView> views;
  private final HashMap<String, ReactVideoView> viewsByMediaId;
  private final ReactApplicationContext context;
  private boolean connecting;
  private PlaybackServiceBinder playback;

  public VideoViewManager(ReactApplicationContext reactContext) {
    this.context = reactContext;
    this.views = new ArrayList<>();
    this.viewsByMediaId = new HashMap<>();
  }

  @NonNull
  @Override
  public String getName() {
    return "RTCVideoView";
  }
  
  @ReactProp(name = "mediaId")
  public void setMediaId(ReactVideoView view, @Nullable String mediaId) {
    Log.i(TAG, "Set media id: " + mediaId);
    viewsByMediaId.remove(view.getMediaId());
    view.setMediaId(mediaId);
    viewsByMediaId.put(view.getMediaId(), view);
    connectPlayer(view);
  }

  @NonNull
  @Override
  protected ReactVideoView createViewInstance(@NonNull ThemedReactContext reactContext) {
    Log.i(TAG, "Initialized new media view");
    ReactVideoView view = new ReactVideoView(reactContext);
    this.views.add(view);
    connectToService(); // connect to service after first view is created
    return view;
  }

  @Override
  public void onDropViewInstance(@NonNull ReactVideoView view) {
    super.onDropViewInstance(view);
    viewsByMediaId.remove(view.getMediaId());
    this.views.remove(view);
    view.dispose();
    Log.i(TAG, "Removed view");
  }

  private void connectToService() {
    if (this.playback != null || this.connecting) {
      return;
    }

    Log.i(TAG, "Starting and connecting to service.");
    this.connecting = true;

    Intent intent = new Intent(context, PlaybackService.class);
    context.startService(intent);
    intent.setAction(PlaybackServiceBinder.CONNECT_ACTION);
    context.bindService(intent, this, 0);
  }

  private void connectPlayer(ReactVideoView view) {
    if (playback == null) {
      return;
    }
    String mediaID = view.getMediaId();
    ExoPlayer player = playback.manager.getExoPlayer(mediaID);
    if (player == null) {
      Log.e(TAG, "Missing player for mediaId: " + mediaID);
      view.setPlayer(null);
    } else {
      view.setPlayer(player);
    }
  }

  @Override
  public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
    playback = (PlaybackServiceBinder)iBinder;
    playback.manager.addListener(this);
    this.connecting = false;
    Log.i(TAG, "Connected to service: " + this.views.size());

    for (ReactVideoView view: views) {
      connectPlayer(view);
    }
  }

  @Override
  public void onServiceDisconnected(ComponentName componentName) {
    playback.manager.removeListener(this);
    Log.i(TAG, "Service disconnected");
    for (ReactVideoView view: views) {
      view.setPlayer(null);
    }
    playback = null;
    //TODO remove playback from all views
    connecting = false;
  }

  @Override
  public void afterMediaLoaded(Media media) {
    ReactVideoView view = viewsByMediaId.get(media.getId());
    if (view != null) {
      connectPlayer(view);
    }
  }

  @Override
  public void afterMediaUnloaded(Media media) {
    ReactVideoView view = viewsByMediaId.get(media.getId());
    if (view != null) {
      view.setPlayer(null);
    }
  }
}
