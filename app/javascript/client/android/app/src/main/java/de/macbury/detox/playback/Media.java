package de.macbury.detox.playback;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.audio.AudioAttributes;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;

import java.util.Date;

import de.macbury.detox.MainApplication;
import de.macbury.detox.helpers.DeviceLock;

/**
 * This class contains loaded media. It main purpose is to track playback change, position of playback, and lock wifi and connection from going off
 */
public class Media {
  private final DeviceLock lock;
  private final SimpleExoPlayer player;
  private final Context context;
  private final String id;
  private final String uri;
  private final Runnable updateTimeRunnable;
  private ExoPlaybackException error;
  private Handler updateTimeHandler;

  protected Media(Context context, String id, String uri, CacheDataSourceFactory cacheDataSourceFactory) {
    this.lock = new DeviceLock(true, "MediaManager");
    this.context = context;
    this.player = buildPlayer();
    this.id = id;
    this.uri = uri;
    this.updateTimeHandler = new Handler();
    this.updateTimeRunnable = new Runnable() {
      @Override
      public void run() {
        Media.this.emitCurrentMediaStatus(false);
        if (Media.this.player.isPlaying()) {
          updateTimeHandler.postDelayed(Media.this.updateTimeRunnable, 1000);
        }
      }
    };

    MediaItem item = new MediaItem.Builder()
        .setUri(uri)
        .setMediaId(id)
        .build();

    MediaSource mediaSource = new ProgressiveMediaSource.Factory(cacheDataSourceFactory)
        .createMediaSource(item);

    player.setMediaSource(mediaSource);
    player.addListener(new Player.Listener() {
      @Override
      public void onPlayerError(ExoPlaybackException error) {
        Media.this.error = error;
        emitCurrentMediaStatus(false);
      }

      @Override
      public void onIsPlayingChanged(boolean isPlaying) {
        if (isPlaying) {
          updateTimeHandler.post(updateTimeRunnable);
          lock.begin(context);
        } else {
          lock.end();
        }
        syncRemotePlaybackState();
      }

      @Override
      public void onPositionDiscontinuity(Player.PositionInfo oldPosition, Player.PositionInfo newPosition, int reason) {
        emitCurrentMediaStatus(true);
        syncRemotePlaybackState();
      }

      @Override
      public void onPlaybackStateChanged(int state) {
        emitCurrentMediaStatus(false);
      }

      @Override
      public void onIsLoadingChanged(boolean isLoading) {
        emitCurrentMediaStatus(false);
      }
    });
    player.prepare();
  }

  private SimpleExoPlayer buildPlayer() {
    AudioAttributes audioAttributes = new AudioAttributes.Builder()
        .setUsage(C.USAGE_MEDIA)
        .setContentType(C.CONTENT_TYPE_MUSIC)
        .build();
    SimpleExoPlayer.Builder builder = new SimpleExoPlayer.Builder(context);
    builder
        .setAudioAttributes(audioAttributes, true);
    return builder.build();
  }

  /**
   * Send playback state to detox api server
   */
  private void syncRemotePlaybackState() {
    Intent service = new Intent(context, SyncPlaybackService.class);
    service.putExtras(Arguments.toBundle(getMediaStatus(true)));
    context.startService(service);
  }

  /**
   * Emit event with current playback information
   */
  private void emitCurrentMediaStatus(boolean forceSendPosition) {
    MainApplication
        .getCurrentReactContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("media:updateStatus", getMediaStatus(forceSendPosition));
  }

  /**
   * Emit information that media was disposed by system or user
   */
  private void emitDispose() {
    MainApplication
        .getCurrentReactContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("media:dispose", id);
  }

  public WritableMap getMediaStatus(boolean forceSendPosition) {
    WritableMap map = Arguments.createMap();
    map.putString("id", id);
    map.putDouble("updatedAt", System.currentTimeMillis() / 1000.0);
    map.putBoolean("isPlaying", this.player.isPlaying());
    map.putBoolean("isLoading", this.player.isLoading());
    if (forceSendPosition || this.player.isPlaying()) {
      map.putDouble("position", this.player.getCurrentPosition() / 1000.0);
    }

    map.putDouble("duration", this.player.getDuration() / 1000.0);
    if (this.error != null) {
      map.putString("error", this.error.toString());
    }
    return map;
  }

  public void pause() {
    this.player.pause();
    emitCurrentMediaStatus(false);
  }

  public void seekTo(long seconds) {
    this.player.seekTo(seconds * 1000);
  }

  public void play() {
    this.error = null;
    this.player.play();
  }

  public void dispose() {
    this.player.stop();
    emitCurrentMediaStatus(false);
    this.player.release();
    this.lock.end();
    this.emitDispose();
  }

  public SimpleExoPlayer getPlayer() {
    return this.player;
  }

  public void playFromPosition(long seconds) {
    this.error = null;
    this.player.seekTo(seconds * 1000);
    this.player.play();
  }

  public String getId() {
    return id;
  }
}
