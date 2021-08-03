package de.macbury.detox.modules;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayDeque;

import de.macbury.detox.playback.PlaybackService;
import de.macbury.detox.playback.PlaybackServiceBinder;

public class AVDriverModule extends ReactContextBaseJavaModule implements ServiceConnection {
  private static final String TAG = "AVDriverModule";
  private PlaybackServiceBinder playback;
  private ArrayDeque<Runnable> initCallbacks = new ArrayDeque<>();
  private boolean connecting;

  public AVDriverModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  /**
   * Execute runnable with being sure that service did boot
   * @param runnable
   */
  private void execute(Runnable runnable) {
    if (playback != null) {
      playback.post(runnable);
      return;
    } else {
      initCallbacks.add(runnable);
    }

    if (connecting) {
      return;
    }

    ReactApplicationContext context = getReactApplicationContext();

    Intent intent = new Intent(context, PlaybackService.class);
    context.startService(intent);
    intent.setAction(PlaybackServiceBinder.CONNECT_ACTION);
    context.bindService(intent, this, 0);
    connecting = true;
  }

  @ReactMethod
  public boolean isEnabled() {
    return playback != null && playback.isBinderAlive();
  }

  @ReactMethod
  public void isLoaded(String id, Promise promise) {
    if (!isEnabled()) {
      promise.resolve(false);
    } else {
      execute(new Runnable() {
        @Override
        public void run() {
          promise.resolve(playback.manager.exists(id));
        }
      });
    }
  }

  @ReactMethod
  public void load(String id, String uri, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        try {
          playback.manager.load(id, uri);
          promise.resolve(null);
        } catch (Error e) {
          promise.reject(e);
          throw e;
        }
      }
    });
  }

  @ReactMethod
  public void setCurrentMedia(ReadableMap media, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        playback.manager.setMediaMetadata(media);
        promise.resolve(null);
      }
    });
  }

  @ReactMethod
  public void clearCurrentMedia(Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        playback.manager.clearMediaMetadata();
        promise.resolve(null);
      }
    });
  }

  @ReactMethod
  public void play(String id, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        promise.resolve(playback.manager.play(id));
      }
    });
  }

  @ReactMethod
  public void pause(String id, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        promise.resolve(playback.manager.pause(id));
      }
    });
  }

  @ReactMethod
  public void setPosition(String id, int seconds, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        promise.resolve(playback.manager.seekTo(id, seconds));
      }
    });
  }

  @ReactMethod
  public void playFromPosition(String id, int seconds, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        promise.resolve(playback.manager.playFromPosition(id, seconds));
      }
    });
  }

  @ReactMethod
  public void unload(String id, Promise promise) {
    execute(new Runnable() {
      @Override
      public void run() {
        playback.manager.unload(id);
        promise.resolve(null);
      }
    });
  }

  @NonNull
  @Override
  public String getName() {
    return "AVDriverModule";
  }

  @Override
  public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
    playback = (PlaybackServiceBinder)iBinder;
    this.connecting = false;
    while(!initCallbacks.isEmpty()) {
      playback.post(initCallbacks.remove());
    }
  }

  @Override
  public void onServiceDisconnected(ComponentName componentName) {
    playback = null;
    connecting = false;
  }
}
