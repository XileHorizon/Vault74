<template>
  <div>
    <h3 class="label">Storage</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Large File Storage</h2>
        <p>Click to enable large file storage, this will allow you to upload very large files and keep more message history cached.</p>
        <br>
        <button class="button is-primary is-small" v-on:click="requestUnlimitedStorage">
          Request Storage Permissions
        </button>
        <hr class="spacer">
        <h2>Export Local Storage</h2>
        <p>Export your Local Storage to move to another browser.</p>
        <br>
        <button class="button is-primary is-small" v-on:click="exportStorage">
          Export Storage
        </button>
        <hr class="spacer">
        <h2>Clear Data</h2>
        <p class="heading">{{storageSize}}</p>
        <p>Quickly clean up locally stored data, please be aware doing so will clear your stored files, message history, and more. <br>
        <br>
        Only do this if you know the repercussions.</p>
        <br>
        <button class="button is-danger is-small" v-on:click="clearData">
          <i class="fas fa-skull-crossbones"></i> &nbsp; Clear Local Data
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Storage',
  data() {
    return {
      storageSize: this.bytesToSize(new Blob(Object.values(localStorage)).size),
    };
  },
  methods: {
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      // eslint-disable-next-line
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      // eslint-disable-next-line
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    requestUnlimitedStorage() {
      // eslint-disable-next-line
      window.browser.permissions.request('unlimitedStorage');
    },
    clearData() {
      localStorage.clear();
      window.location.reload();
    },
    downloadToFile(content, filename, contentType) {
      const a = document.createElement('a');
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    exportStorage() {
      this.downloadToFile(
        JSON.stringify(localStorage),
        'storage.json',
        'application/json',
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
