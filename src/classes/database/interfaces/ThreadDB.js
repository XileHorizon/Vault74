/* eslint-disable */
export class ThreadDB  {
    constructor(prefix) {
      this.prefix = prefix;
    }
  
    async _store(value, name) {
      return new Promise(async (resolve) => {
        const values = await this._retrive(name);
        values.push(value);
        localStorage.setItem(
          this._key(name),
          JSON.stringify(values),
        );
        resolve();
      })
    }
  
    async _update(bucket, name) {
      return new Promise((resolve) => {
        localStorage.setItem(
          this._key(name),
          JSON.stringify(bucket),
        );
        resolve();
      });
    }
  
    async _retrive(name) {
      return new Promise((resolve) => {
        const data = localStorage.getItem(this._key(name)) ?
          JSON.parse(
            localStorage.getItem(this._key(name)),
          ) :
          [];
        resolve(data);
      });
    }
  
    _key(name) {
      return `${this.prefix}${name}`;
    }
  }
  