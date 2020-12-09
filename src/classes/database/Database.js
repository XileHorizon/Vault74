import Collection from './Collection';
import UnsortedCollection from './Bucket';
import { LocalStorageInterface } from './interfaces/LocalStorage';

/* eslint-disable */
export default class Database {
  /** @constructor
   * Construct a Database
   * Provides key-value and relational storage
   * @argument name the name of the database
   */
  constructor(name) {
    this.name = name;
    this.prefix = 'vdb.';
    this.interface = new LocalStorageInterface(this.prefix);
  }

  /** 
   * @method
   * Construct a Collection
   * A bucket stores data in a key-value structure
   * @argument name the name of the bucket
   */
  Collection(name) {
    return new Collection(name, this);
  }

  /** 
   * @method
   * Construct a Bucket
   * A bucket stores data in a relational structure
   * @argument name the name of the bucket
   */
  Bucket(name) {
    return new UnsortedCollection(name, this);
  }
}
