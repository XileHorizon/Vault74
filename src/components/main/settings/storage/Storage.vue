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
        <hr>
        <h2>Clear Data</h2>
        <p>Clear your local storage data, please note that if you did not back up your account you could lose access to it.</p>
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
  methods: {
    requestUnlimitedStorage() {
      // eslint-disable-next-line
      window.browser.permissions.request('unlimitedStorage');
    },
    clearData() {
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
