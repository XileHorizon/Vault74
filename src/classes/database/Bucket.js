/* eslint-disable */
export default class Bucket {
  constructor(name, database) {
    this.name = name;
    this.database = database;
  }

  get() {
    return this.database.interface._retrive(this.name);
  }

  add(value) {
    this.database.interface._store(value);
  }

  remove(value) {
    let values = this.get();
    values = values.filter(item => JSON.stringify(item) !== JSON.stringify(value));
    this.database.interface._forceUpdate(values);
  }
}