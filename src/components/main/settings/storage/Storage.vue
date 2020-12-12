<template>
  <div>
    <h3 class="label">Database</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Enable Database</h2>
      
        <div class="bordered margin-2">
          <div class="columns">
            <div class="column" style="max-width: 200px;">
              <img src="https://textile.io/images/logo-dark.png" class="margin" alt="" />
            </div>
            <div class="column is-two-thirds padded">
              <p class="padded">Vault74 utilizes Texile's ThreadDB to store your data, you can learn more about them here: <a href="https://textile.io/">https://textile.io/</a></p>
            </div>
          </div>
        </div>

        <p>
          Enable <b>ThreadDB</b>, a decentralized database used to recieve offline messaging and unlock additional features.
          <br>
          Your data is stored on a distributed network and none of that data passes through us.
        </p>
        <br>
        <ToggleSwitch v-model="$store.state.databaseEnabled"/>
        <hr class="spacer">
        <h2>Your Data ID</h2>
        <p>
          Your data ID references all the data stored in the app. Save this somewhere save to transfer your data to another browser.
          <br> <br>
          <input v-model="dataid" readonly class="input is-small" placeholder="data..." />     
        </p>
      </div>
    </article>
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
import ToggleSwitch from '@/components/common/ToggleSwitch';

export default {
  name: 'Storage',
  components: {
    ToggleSwitch,
  },
  data() {
    return {
      dataid: localStorage.getItem('textile.threads.user-storage'),
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
  .margin {
    margin: 0.5rem;
    margin-left: 25px;
    width: 150px;
  }
  .margin-2 {
    margin: 1rem 0;
  }
  .padded {
    padding-top: 0.65rem;
    padding-left: 1rem;
  }
</style>
