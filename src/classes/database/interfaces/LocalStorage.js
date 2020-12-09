/* eslint-disable */
export class LocalStorageInterface {
  constructor(prefix) {
    this.prefix = prefix;
  }

  _store(value, name) {
    const values = this._retrive(name);
    values.push(value);

    localStorage.setItem(
        this._key(name),
        JSON.stringify(values),
    );
  }

  _storeCollection(key, value, name) {
    localStorage.setItem(
      this._collectionKey(key, name),
      JSON.stringify(value),
    );
    this._updateCollection(key);
  }


  _forceUpdate(bucket, name) {
    localStorage.setItem(
        this._key(name),
        JSON.stringify(bucket),
    );
  }

  _retrive(name) {
    return localStorage.getItem(this._key(name)) ?
      JSON.parse(
        localStorage.getItem(this._key(name)),
      ) :
      [];
  }

  _retriveCollection(name, key) {
    JSON.parse(
      localStorage.getItem(this._collectionKey(name, key)),
    );
  }

  _key(name) {
    return `${this.prefix}${name}`;
  }

  _collectionKey(name, key) {
    return `${this.prefix}${name}.${key}`;
  }

  _collectionKeys(name) {
    return JSON.parse(
      localStorage.getItem(
        `${this.prefix}${name}`
      )
    );
  }

  _updateCollection(key, name) {
    this.values.push(key);
    localStorage.setItem(
      `${this.prefix}${name}`,
      JSON.stringify(this.values),
    );
  }
}
