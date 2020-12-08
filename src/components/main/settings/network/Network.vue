<template>
  <div>
    <h3 class="label">Network</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Web3 Provider</h2>
        <p>A Web3 provider is simply the way you chose to interact with the blockchain. For most people <b>Default</b> is fine.</p>
        <br>
        <div class="select">
          <select v-model="network" @change="networkChanged">
            <option value="default">Default</option>
            <option value="infura">Infura</option>
            <option value="vault74">Vault74</option>
          </select>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Network',
  data() {
    return {
      network: localStorage.getItem('Vault74.provider') || 'default',
    };
  },
  methods: {
    networkChanged() {
      localStorage.setItem('Vault74.provider', this.network);
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
