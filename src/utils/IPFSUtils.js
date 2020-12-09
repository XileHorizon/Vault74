import Database from '@/classes/database/Database';

const database = new Database('Vault74Data');
const bucket = database.Bucket('files');

// Helper methods for interacting with IPFS
export default {
  utilsVersion: 0.0,
  /** @function
   * @name appendFileCache
   * @argument file File object to add to the cache
   * @returns appends the file object to whatever caching system we use
   */
  appendFileCache(file) {
    const files = this.getFileCache();
    files.push(file);
    bucket.add(file);
  },
  /** @function
   * this is a wrapper over our storage method so we can easily
   * change this in the future
   * @name getFileCache
   * @returns returns the file cache
   */
  getFileCache() {
    return bucket.get();
  },
  /** @function
   * @name removeFileFromCache
   * @argument file File object to remove from the cache
   */
  removeFileFromCache(file) {
    bucket.remove(file);
  },
};
