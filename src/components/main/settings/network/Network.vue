<template>
  <div>
    <h3 class="label">Network</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Web3 Provider</h2>
        <p>A Web3 provider is simply the way you chose to interact with the blockchain. For most people MetaMask is fine.</p>
        <br>
        <div class="select" v-if="$store.state.selectedProvider">
          <select v-model="$store.state.selectedProvider">
            <option v-for="provider in $store.state.availableProviders" :key="provider">{{provider}}</option>
          </select>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Network',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
