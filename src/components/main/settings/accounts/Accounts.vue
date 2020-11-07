<template>
  <div>
    <h3 class="label">Accounts</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Active Account</h2>
        <p>Select with Ethereum acccount you'd prefer to default transactions from.</p>
        <br>
        <p><b>Balance: {{$store.state.balance}} ETH</b></p>
        <div class="select" v-if="$store.state.accounts">
          <select v-model="$store.state.activeAccount">
            <option v-for="account in $store.state.accounts" :key="account">{{account}}</option>
          </select>
        </div>
        <hr>
        <h2>Gas Price (Gwei)</h2>
        <p>Higher gas prices will transact faster.</p>
        <br>
        <input v-model="$store.state.gasPrice" class="input" />
      </div>
    </article>
    <h3 class="label">Devices</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Connected Devices</h2>
        <p>No external wallets connected.</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Accounts',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
