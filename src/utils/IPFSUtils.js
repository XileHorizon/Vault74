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
    localStorage.setItem('vault.filehistory', JSON.stringify(files));
  },
  /** @function
   * this is a wrapper over our storage method so we can easily
   * change this in the future
   * @name getFileCache
   * @returns returns the file cache
   */
  getFileCache() {
    return localStorage.getItem('vault.filehistory') ?
      JSON.parse(localStorage.getItem('vault.filehistory')) :
      [];
  },
  /** @function
   * @name removeFileFromCache
   * @argument file File object to remove from the cache
   */
  removeFileFromCache(file) {
    let files = this.getFileCache();
    files = files.filter(item => JSON.stringify(item) !== JSON.stringify(file));
    localStorage.setItem('vault.filehistory', JSON.stringify(files));
  },
};
