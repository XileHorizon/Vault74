<template>
  <div :class="`modal ${connected ? '' : 'is-active'}`">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body" style="text-align: center;">
        <p class="head"><strong>Connecting to Network...</strong></p>
        <b>If you do not have a Ethereum provider installed, please consider installing MetaMask. </b>
        <br /><br>
        <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>
      </section>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import Web3 from 'web3';

export default {
  name: 'Web3',
  data() {
    return {
      connected: false,
    };
  },
  methods: {
    web3Polling() {
      Promise.all([
        window.web3.eth.getAccounts(),
        window.web3.eth.getBlockNumber(),
        window.web3.eth.net.getNetworkType(),
      ]).then((stats) => {
        this.$store.commit('web3Stats', {
          defaultBlock: window.web3.eth.defaultBlock,
          blockNumber: stats[1],
          nettype: stats[2],
        });
        this.$store.commit('accounts', stats[0]);
        this.$store.commit('defaultAccount');
        window.web3.eth.getBalance(this.$store.state.activeAccount).then((bal) => {
          this.$store.commit('balance', window.web3.utils.fromWei(bal));
        });
      });
    },
  },
  mounted() {
    const ethEnabled = () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        this.connected = true;
        this.web3Polling();
        setInterval(() => {
          this.web3Polling();
        }, 4000);
        return true;
      }
      return false;
    };
    ethEnabled();
  },
};
</script>

<style scoped lang="less">
  .head {
    font-family: 'Major Mono Display', monospace;
    font-size: 20pt;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
</style>