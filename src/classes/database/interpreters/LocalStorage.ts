// @ts-ignore
import crypto from '@/utils/Crypto';

interface Creds {
  id: string,
  pass: string,
}
/* eslint-disable */
export class LocalStorage {
  creds: Creds;
  prefix: string;

  constructor(prefix: string, creds: Creds) {
    this.prefix = prefix;
    this.creds = creds;
  }

  async _store(value: object, name: string) : Promise<void> {
    return new Promise(async (resolve) => {
      const values = await this._retrive(name);
      values.push(value);

      const encrypted = await crypto.encrypt(
        JSON.stringify(values),
        this.creds.pass,
      );

      localStorage.setItem(
        this._key(name),
        encrypted,
      );
      resolve();
    })
  }

  async _update(bucket: any, name: string) : Promise<void> {
    return new Promise(async (resolve) => {
      const encrypted = await crypto.encrypt(
        JSON.stringify(bucket),
        this.creds.pass,
      );
      localStorage.setItem(
        this._key(name),
        encrypted
      );
      resolve();
    });
  }

  async _retrive(name: string) : Promise<any[]>{
    return new Promise(async (resolve) => {
      let decrypted = localStorage.getItem(this._key(name)) ? await crypto.decrypt(
        localStorage.getItem(this._key(name)),
        this.creds.pass,
      ) : [];

      if (typeof decrypted === 'string') decrypted = JSON.parse(decrypted);

      resolve(decrypted);
    });
  }

  _key(name: string) {
    return `${this.prefix}${name}`;
  }
}
