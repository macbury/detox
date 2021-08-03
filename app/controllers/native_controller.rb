# Handle native update part of application, Track apk file and what version it is
class NativeController < ApplicationController
  def show
    render json: {
      versionName: android_json.fetch('versionName'),
      versionCode: version_code,
      apkUrl: Rails.application.routes.url_helpers.apk_download_url,
      forceUpdate: false
    }
  end

  def apk
    response.headers['Content-Length'] = File.size(android_apk_path)

    send_file android_apk_path, filename: "detox-#{version_code}.apk"
  end

  private

  def android_apk_path
    Rails.root.join('native/detox.apk')
  end

  def android_json_path
    Rails.root.join('native/android.json')
  end

  def android_json
    @android_json ||= JSON.parse(android_json_path.read).dig(0, 'apkData') || {}
  end

  def version_code
    @version_code ||= android_json.fetch('versionCode')
  end
end