package de.macbury.detox.playback;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.support.v4.media.MediaDescriptionCompat;

import androidx.annotation.Nullable;

import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.fresco.ReactNetworkImageRequest;
import com.facebook.react.views.imagehelper.ImageSource;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.ext.mediasession.MediaSessionConnector;
import com.google.android.exoplayer2.ui.PlayerNotificationManager;

import javax.annotation.Nonnull;

import de.macbury.detox.MainActivity;

public class MediaMetadata implements PlayerNotificationManager.MediaDescriptionAdapter {
  private final Context context;
  private String id;
  private String title;
  private String channel;
  private String posterUrl;
  private Bitmap poster;
  private String intentUrl;

  public MediaMetadata(Context context) {
    this.context = context;
  }

  public void set(ReadableMap media) {
    this.id = media.getString("id");
    this.title = media.getString("title");
    this.channel = media.getString("channel");
    this.posterUrl = media.getMap("poster").getString("url");
    this.intentUrl = media.getString("intentUrl");
    this.poster = null;
  }

  public void clear() {
    this.id = null;
    this.title = null;
    this.channel = null;
    this.poster = null;
  }

  public String getId() {
    return id;
  }

  @Override
  public CharSequence getCurrentContentTitle(Player player) {
    return title;
  }

  @Nullable
  @Override
  public PendingIntent createCurrentContentIntent(Player player) {
    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(intentUrl));
    intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT);
    return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
  }

  @Nullable
  @Override
  public CharSequence getCurrentContentText(Player player) {
    return channel;
  }

  @Nullable
  @Override
  public Bitmap getCurrentLargeIcon(Player player, PlayerNotificationManager.BitmapCallback callback) {
    if (poster == null) {
      ImageRequest posterRequest = ReactNetworkImageRequest.fromUri(this.posterUrl);
      ImagePipeline imagePipeline = Fresco.getImagePipeline();
      DataSource<CloseableReference<CloseableImage>> posterSource = imagePipeline.fetchDecodedImage(posterRequest, null);

      posterSource.subscribe(new BaseBitmapDataSubscriber() {
        @Override
        protected void onNewResultImpl(@javax.annotation.Nullable Bitmap bitmap) {
          MediaMetadata.this.poster = bitmap;
          callback.onBitmap(bitmap);
        }

        @Override
        protected void onFailureImpl(@Nonnull DataSource<CloseableReference<CloseableImage>> dataSource) {

        }
      }, UiThreadImmediateExecutorService.getInstance());
      return null;
    }
    return poster;
  }

  public MediaDescriptionCompat getMediaDescription() {
    return new MediaDescriptionCompat.Builder()
        .setTitle(title)
        .setDescription(channel)
        .setMediaId(id)
        .setIconBitmap(poster)
        .build();
  }
}
