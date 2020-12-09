/* eslint-disable */
export default class Bucket {
  /** @constructor
   * Construct a Bucket
   * A bucket stores data in a relational structure
   * @argument name the name of the bucket
   * @argument database main database reference
   */
  constructor(name, database) {
    this.name = name;
    this.database = database;
  }

  /** @method
   * @name get
   * @returns The contents of the bucket
   */
  get() {
    // Clone array to prevent mutation
    return [...this.database.interface._retrive(this.name)];
  }

  /** @method
   * @name add
   * Adds an item to the bucket
   * @argument value Data to add to the bucket storage
   */
  add(value) {
    this.database.interface._store(value, this.name);
  }

  /** @method
   * @name remove
   * Removes an item from the bucket
   * @argument value Data to add to remove from the bucket storage
   */
  remove(value) {
    let values = this.get();
    values = values.filter(item => JSON.stringify(item) !== JSON.stringify(value));
    this.database.interface._forceUpdate(values, this.name);
  }
}