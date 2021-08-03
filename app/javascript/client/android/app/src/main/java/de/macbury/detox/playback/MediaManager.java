package de.macbury.detox.playback;

import android.content.Context;
import android.support.v4.media.MediaDescriptionCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.util.Log;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ext.mediasession.MediaSessionConnector;
import com.google.android.exoplayer2.ext.mediasession.TimelineQueueNavigator;
import com.google.android.exoplayer2.ui.PlayerNotificationManager;

import java.util.ArrayList;
import java.util.HashMap;

import de.macbury.detox.R;

/**
 * Manage audio and video playback for multiple sources identified by id
 */
public class MediaManager  {
  private static final String TAG = "MediaManager";
  public static final String CHANNEL_ID = "media";
  private static final int NOTIFICATION_ID = 666;
  private final Context context;
  private final HashMap<String, Media> players;
  private final MediaMetadata metadata;
  private final CacheDataSourceFactory cacheDataSourceFactory;
  private PlayerNotificationManager notificationManager;
  private MediaSessionCompat mediaSession;
  private MediaSessionConnector mediaSessionConnector;

  public interface OnMediaChangeListener {
    void afterMediaLoaded(Media media);
    void afterMediaUnloaded(Media media);
  }

  private ArrayList<OnMediaChangeListener> listeners;

  public MediaManager(Context context, PlayerNotificationManager.NotificationListener listener) {
    this.cacheDataSourceFactory = new CacheDataSourceFactory(context);
    this.listeners = new ArrayList<>();
    this.context = context;
    this.players = new HashMap<>();
    this.metadata = new MediaMetadata(context);
    this.configureMediaSession();
    this.configureNotifications(listener);
  }

  public void addListener(OnMediaChangeListener listener) {
    this.listeners.add(listener);
  }

  public void removeListener(OnMediaChangeListener listener) {
    this.listeners.remove(listener);
  }

  private void configureMediaSession() {
    this.mediaSession = new MediaSessionCompat(this.context, "detox");
    this.mediaSessionConnector = new MediaSessionConnector(this.mediaSession);
  }

  private void configureNotifications(PlayerNotificationManager.NotificationListener listener) {
    PlayerNotificationManager.Builder builder = new PlayerNotificationManager.Builder(
        context, NOTIFICATION_ID, CHANNEL_ID, metadata
    );
    builder.setNotificationListener(listener);

    this.notificationManager = builder.build();
    this.notificationManager.setSmallIcon(R.drawable.ic_stat_icon);
    this.notificationManager.setUseNextAction(false);
    this.notificationManager.setUsePreviousAction(false);
    this.notificationManager.setUseStopAction(true);
    this.notificationManager.setColorized(true);
    this.notificationManager.setMediaSessionToken(mediaSession.getSessionToken());
  }

  public ExoPlayer getExoPlayer(String id) {
    if (exists(id)) {
      return players.get(id).getPlayer();
    } else {
      return null;
    }
  }

  public void setMediaMetadata(ReadableMap media) {
    metadata.set(media);
    String id = metadata.getId();

    if (!exists(id)) {
      this.notificationManager.setPlayer(null);
      Log.e(TAG, "Updated metadata for not existing id");
      return;
    }

    SimpleExoPlayer exoPlayer = players.get(id).getPlayer();
    this.notificationManager.setPlayer(exoPlayer);
    this.mediaSessionConnector.setPlayer(exoPlayer);
    this.mediaSessionConnector.setQueueNavigator(new TimelineQueueNavigator(mediaSession) {
      @Override
      public MediaDescriptionCompat getMediaDescription(Player player, int windowIndex) {
        return metadata.getMediaDescription();
      }
    });
    this.mediaSession.setActive(true);
  }

  public void clearMediaMetadata() {
    this.mediaSessionConnector.setPlayer(null);
    this.mediaSession.setActive(false);
    this.notificationManager.setPlayer(null);
    this.mediaSessionConnector.setQueueNavigator(null);
    this.metadata.clear();
  }

  /**
   * Load audio or video to be ready to play
   * @param uri
   */
  public void load(String id, String uri) {
    if (exists(id)) {
      Log.e(TAG, "Already loaded audio: " + uri);
      return;
    }

    Media media = new Media(context, id, uri, cacheDataSourceFactory);
    players.put(id, media);
    Log.i(TAG, "Loaded media" + id);
    for (OnMediaChangeListener listener: this.listeners) {
      listener.afterMediaLoaded(media);
    }
  }

  public boolean play(String id) {
    if (!exists(id)) {
      Log.e(TAG, "Missing media to play with id: " + id);
      return false;
    }

    cacheDataSourceFactory.logStatus();
    players.get(id).play();
    return true;
  }

  public boolean pause(String id) {
    if (!exists(id)) {
      Log.e(TAG, "Missing media to pause with id: " + id);
      return false;
    }

    cacheDataSourceFactory.logStatus();
    players.get(id).pause();
    return true;
  }

  public boolean seekTo(String id, long seconds) {
    if (!exists(id)) {
      Log.e(TAG, "Missing media to seekTo with id: " + id);
      return false;
    }

    players.get(id).seekTo(seconds);
    return true;
  }

  public boolean playFromPosition(String id, long seconds) {
    if (!exists(id)) {
      Log.e(TAG, "Missing media to seekTo with id: " + id);
      return false;
    }

    Media player = players.get(id);
    player.playFromPosition(seconds);

    return true;
  }

  public void unload(String id) {
    Log.i(TAG, "Unload media with id: " + id);
    if (exists(id)) {
      Media media = players.get(id);
      media.dispose();
      players.remove(id);
      for (OnMediaChangeListener listener: this.listeners) {
        listener.afterMediaUnloaded(media);
      }
    }
  }

  public void dispose() {
    mediaSessionConnector.setPlayer(null);
    mediaSession.release();
    notificationManager.setPlayer(null);
    for (Media player: players.values()) {
      player.dispose();
    }
    players.clear();
    listeners.clear();
    cacheDataSourceFactory.dispose();
  }

  public boolean exists(String id) {
    return players.containsKey(id);
  }
}
