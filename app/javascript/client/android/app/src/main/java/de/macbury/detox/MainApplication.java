package de.macbury.detox;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactContext;
import com.facebook.soloader.SoLoader;
import de.macbury.detox.generated.BasePackageList;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;

import de.macbury.detox.modules.DetoxPackage;
import de.macbury.detox.playback.MediaManager;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
  private static MainApplication instance;

  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      packages.add(new DetoxPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected @Nullable String getJSBundleFile() {
      return super.getJSBundleFile();
    }

    @Override
    protected @Nullable String getBundleAssetName() {
      return super.getBundleAssetName();
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
      NotificationChannel mediaChannel = new NotificationChannel(MediaManager.CHANNEL_ID, "Playback", NotificationManager.IMPORTANCE_LOW);
      mediaChannel.enableVibration(false);
      mediaChannel.enableLights(false);
      NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
      notificationManager.createNotificationChannel(mediaChannel);
    }

    this.instance = this;
    SoLoader.init(this, /* native exopackage */ false);

    //initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  public static ReactContext getCurrentReactContext() {
    return instance.getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("de.macbury.detox.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
