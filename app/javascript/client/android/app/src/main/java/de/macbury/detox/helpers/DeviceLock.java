package de.macbury.detox.helpers;

import android.content.Context;
import android.net.wifi.WifiManager;
import android.os.PowerManager;

import static android.content.Context.POWER_SERVICE;

/**
 * Helper for creating wake locks
 */
public class DeviceLock {
  private final boolean wifi;
  private PowerManager powerManager;
  private WifiManager wifiManager;
  private final String name;
  private PowerManager.WakeLock wakeLock;
  private WifiManager.WifiLock wifiLock;
  private boolean enabled;

  public DeviceLock(boolean wifi, String name) {
    this.wifi = wifi;
    this.name = name;
    this.enabled = false;
  }

  public void begin(Context context) {
    if (enabled) {
      return;
    }
    this.powerManager = (PowerManager)context.getSystemService(POWER_SERVICE);
    this.wifiManager = ((WifiManager)context.getSystemService(Context.WIFI_SERVICE));
    this.wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, name);
    if (this.wifi) {
      this.wifiLock = wifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL, name);
      this.wifiLock.acquire();
    }

    this.wakeLock.acquire();
  }

  public void end() {
    this.enabled = false;
    if (this.wakeLock != null) {
      this.wakeLock.release();
    }

    if (this.wifiLock != null) {
      this.wifiLock.release();
    }

    this.wakeLock = null;
    this.wifiLock = null;
  }
}
