import crypto from '@/utils/Crypto';

/* eslint-disable */
export class LocalStorageInterface {
  constructor(prefix, creds) {
    this.prefix = prefix;
    this.creds = creds;
  }

  async _store(value, name) {
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

  async _update(bucket, name) {
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

  async _retrive(name) {
    return new Promise(async (resolve) => {
      let decrypted = localStorage.getItem(this._key(name)) ? await crypto.decrypt(
        localStorage.getItem(this._key(name)),
        this.creds.pass,
      ) : [];

      if (typeof decrypted === 'string') decrypted = JSON.parse(decrypted);

      resolve(decrypted);
    });
  }

  _key(name) {
    return `${this.prefix}${name}`;
  }
}
