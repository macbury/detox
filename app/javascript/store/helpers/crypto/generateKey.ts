import { formatAsPem, TGeneratedKeyType } from "./types";

export const JWT_ALG = 'ES256'
export const ALGO_OPTS = {
  name: "ECDSA",
  namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
}

function spkiToPEM(keydata){
  var keydataS = arrayBufferToString(keydata);
  var keydataB64 = window.btoa(keydataS);
  var keydataB64Pem = formatAsPem(keydataB64);
  return keydataB64Pem;
}

function arrayBufferToString( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return binary;
}


// https://github.com/diafygi/webcrypto-examples#ecdsa---importkey
export default async function generateKey() : Promise<TGeneratedKeyType> {
  const sessionKey : any = await window.crypto.subtle.generateKey(ALGO_OPTS, true, ["sign", "verify"])

  const publicKey = await crypto.subtle.exportKey("spki", sessionKey.publicKey)
  const privateKey = await crypto.subtle.exportKey("jwk", sessionKey.privateKey)

  return {
    publicKey: spkiToPEM(publicKey),
    privateKey
  }
}