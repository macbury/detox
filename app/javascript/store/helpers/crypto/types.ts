export type TGeneratedKeyType = {
  publicKey: string
  privateKey: JsonWebKey
}


export function formatAsPem(str : string) {
  let finalString = '-----BEGIN PUBLIC KEY-----\n';

  while(str.length > 0) {
    finalString += str.substring(0, 64) + '\n';
    str = str.substring(64);
  }

  finalString = finalString + "-----END PUBLIC KEY-----";

  return finalString;
}