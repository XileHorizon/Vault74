/* eslint-disable */
export default class Collection {
  /** @constructor
   * Construct a Collection
   * A bucket stores data in a key-value structure
   * @argument name the name of the bucket
   * @argument database main database reference
   */
  constructor(name, database) {
    this.name = name;
    this.database = database;
    this.values = this.database.interface._collectionKeys(this.name) || [];
  }

  /** @method
   * @name get
   * Get data from the Collection
   * @argument key key assigned to the data to retrieve
   * @returns The contents of data assigned to the key
   */
  get(key) {
    if (typeof key !== 'string') {
      throw new Error('Invalid key given. Please provide a string.');
    }
    return this._retriveCollection(
      this.database.interface._collectionKey(key, this.name),
    );
  }

  /** @method
   * @name set
   * Set data in the Collection
   * @argument key key assigned to the data to set
   * @argument value data to store in the collection
   */
  set(key, value) {
    if (typeof key !== 'string') {
      throw new Error('Invalid key given. Please provide a string.');
    }
    this.database.interface._storeCollection(key, value, this.name);
  }

  /** @method
   * @name all
   * Retrieve all data from the current collection
   * @returns All data from the collection
   */
  all() {
    const collection = [];
    this.values.forEach(key => {
      collection.push(this.get(key));
    });
    return collection;
  }

}