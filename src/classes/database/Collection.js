/* eslint-disable */
export default class Collection {
  constructor(name, database) {
    this.name = name;
    this.database = database;
    this.values = this._collectionKeys(this.name) || [];
  }

  get(key) {
    if (typeof key !== 'string') {
      throw new Error('Invalid key given. Please provide a string.');
    }
    return this._retriveCollection(
      this.database.interface._collectionKey(key, this.name),
    );
  }

  set(key, value) {
    if (typeof key !== 'string') {
      throw new Error('Invalid key given. Please provide a string.');
    }
    this._storeCollection(key, value, this.name);
  }

  all() {
    const collection = [];
    this.values.forEach(key => {
      collection.push(this.get(key));
    });
    return collection;
  }

}