package de.macbury.detox.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class JwtModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext context;

  public JwtModule(ReactApplicationContext reactContext) {
    this.context = reactContext;
  }

  @ReactMethod
  public void generateKey(Promise promise) {
    KeyPair keyPair = Keys.keyPairFor(SignatureAlgorithm.ES256);
    String publicKey = Encoders.BASE64.encode(keyPair.getPublic().getEncoded());
    String privateKey = Encoders.BASE64.encode(keyPair.getPrivate().getEncoded());

    WritableMap map = new WritableNativeMap();

    map.putString("publicKey", publicKey);
    map.putString("privateKey", privateKey);

    promise.resolve(map);
  }

  @ReactMethod
  public void generateAccessToken(String base64EncodedPrivateKey, String sessionId, Promise promise) {
    byte[] privateKeyBytes = Decoders.BASE64.decode(base64EncodedPrivateKey);
    PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
    try {
      KeyFactory keyFactory = KeyFactory.getInstance("EC");
      PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
      Date expireAt = new Date(System.currentTimeMillis() + 60 * 1000);

      String jws = Jwts.builder()
          .setAudience("*")
          .setIssuer(sessionId)
          .setExpiration(expireAt)
          .signWith(privateKey)
          .compact();

      promise.resolve(jws);
    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
      promise.reject(e);
      e.printStackTrace();
    }
  }

  @NonNull
  @Override
  public String getName() {
    return "JwtModule";
  }
}
