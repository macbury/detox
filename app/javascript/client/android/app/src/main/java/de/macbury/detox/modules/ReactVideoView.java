package de.macbury.detox.modules;

import android.content.Context;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ui.PlayerView;

//https://github.com/3dEYE/react-native-exoplayer/blob/master/android/src/main/java/com/threedeye/reactvideo/ExoPlayerView.java
public class ReactVideoView extends FrameLayout {
  private final PlayerView playerView;
  private String mediaId;

  public ReactVideoView(Context context) {
    super(context);

    this.playerView = new PlayerView(context);
    this.playerView.setUseController(false);
    addView(playerView, new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, Gravity.CENTER));
  }

  public String getMediaId() {
    return mediaId;
  }

  public void setMediaId(String mediaId) {
    this.mediaId = mediaId;
  }

  public void setPlayer(ExoPlayer player) {
    this.playerView.setPlayer(player);
  }

  public void dispose() {
    this.playerView.setPlayer(null);
    this.mediaId = null;
  }
}
