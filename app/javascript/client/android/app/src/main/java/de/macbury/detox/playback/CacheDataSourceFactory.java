package de.macbury.detox.playback;

import android.content.Context;
import android.util.Log;

import com.google.android.exoplayer2.database.DatabaseProvider;
import com.google.android.exoplayer2.database.ExoDatabaseProvider;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSource;
import com.google.android.exoplayer2.upstream.FileDataSource;
import com.google.android.exoplayer2.upstream.cache.CacheDataSink;
import com.google.android.exoplayer2.upstream.cache.CacheDataSource;
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;

import java.io.File;

/**
 * Exoplayer by default is not using any caching. This class implements the most basic cache
 */
public class CacheDataSourceFactory implements DataSource.Factory {
  private static final long MEGABYTE = 1024 * 1024;
  public final static long MAX_CACHE_SIZE = 500 * MEGABYTE;
  public final static long MAX_FILE_SIZE = 500 * MEGABYTE;
  private static final String TAG = "CacheDataSource";
  private final Context context;
  private final DefaultHttpDataSource.Factory dataSourceFactory;
  private final DefaultBandwidthMeter bandwidthMeter;
  private final SimpleCache simpleCache;

  public CacheDataSourceFactory(Context context) {
    this.context = context;
    this.bandwidthMeter = new DefaultBandwidthMeter.Builder(context)
        .build();
    dataSourceFactory = new DefaultHttpDataSource.Factory();

    DatabaseProvider databaseProvider = new ExoDatabaseProvider(context);
    LeastRecentlyUsedCacheEvictor evictor = new LeastRecentlyUsedCacheEvictor(MAX_CACHE_SIZE);
    this.simpleCache = new SimpleCache(new File(context.getCacheDir(), "media"), evictor, databaseProvider);
  }

  public void logStatus() {
    Log.i(TAG, "Cached: " + this.simpleCache.getKeys());
  }

  @Override
  public DataSource createDataSource() {
    return new CacheDataSource(simpleCache, dataSourceFactory.createDataSource(),
        new FileDataSource(), new CacheDataSink(simpleCache, MAX_FILE_SIZE),
        CacheDataSource.FLAG_BLOCK_ON_CACHE | CacheDataSource.FLAG_IGNORE_CACHE_ON_ERROR, null);
  }

  public void dispose() {
    this.simpleCache.release();
  }
}
