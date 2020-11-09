export default {
  utilsVersion: 0.0,
  appendFileCache(file) {
    const files = this.getFileCache();
    files.push(file);
    localStorage.setItem('vault.filehistory', JSON.stringify(files));
  },
  getFileCache() {
    return localStorage.getItem('vault.filehistory') ?
      JSON.parse(localStorage.getItem('vault.filehistory')) :
      [];
  },
  removeFileFromCache(file) {
    let files = this.getFileCache();
    files = files.filter(item => JSON.stringify(item) !== JSON.stringify(file));
    localStorage.setItem('vault.filehistory', JSON.stringify(files));
  },
};
