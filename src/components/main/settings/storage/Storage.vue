<template>
  <div>
    <h3 class="label">Storage</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Clear Data</h2>
        <p>Clear your local storage data, please note that if you did not back up your account you could lose access to it.</p>
        <br>
        <button class="button is-danger" v-on:click="clearData">
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
