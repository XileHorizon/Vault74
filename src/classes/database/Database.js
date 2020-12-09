import Collection from './Collection';
import UnsortedCollection from './Bucket';
import { LocalStorageInterface } from './interfaces/LocalStorage';

/* eslint-disable */
export default class Database {
  constructor(name) {
    this.name = name;
    this.prefix = 'vdb.';
    this.interface = new LocalStorageInterface(this.prefix);
  }

  Collection(name) {
    return new Collection(name, this);
  }

  Bucket(name) {
    return new UnsortedCollection(name, this);
  }
}
