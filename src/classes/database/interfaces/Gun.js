import Gun from 'gun/gun';
import 'gun/sea';
import crypto from '@/utils/Crypto';

const gun = Gun();

/* eslint-disable */
export class GunInterface {
  constructor(prefix, database) {
    this.prefix = prefix;
    this.database = database;
  }

  async _store(value, name) {
    return new Promise(async (resolve) => {
      const values = await this._retrive(name);
      values.push(value);

      const encrypted = await crypto.encrypt(
        JSON.stringify(values),
        this.database.creds.pass,
      );

      gun.get(this._key(name))
        .put({
          data: encrypted
        });

      resolve();
    });
  }

  async _retrive(name) {
    return new Promise((resolve) => {
      gun.get(this._key(name))
        .once((node) => {
          let decrypted = node ? await crypto.decrypt(
            node.data,
            this.database.creds.pass,
            ) : [];

          decrypted = JSON.parse(decrypted);

          resolve(decrypted);
        });
    });
  }

  _key(name) {
    return `${this.prefix}${name}`;
  }

  async _update(bucket, name) {
    return new Promise(async (resolve) => {
      const encrypted = await crypto.encrypt(
        JSON.stringify(bucket),
        this.database.creds.pass,
      );

      gun.get(this._key(name))
        .put({
          data: encrypted,
        });

      resolve();
    });
  }
}
