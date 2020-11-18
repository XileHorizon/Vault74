<template>
  <div v-click-outside="close">
    <p class="label">Change Username</p>
    <input type="text" class="input" v-model="username" />
    <br>
    <br>
    <button class="button is-primary is-small change-photo" :disabled="!username.length >= 4" v-on:click="changeUsername">Change Username</button>
    <div style="clear: both;"></div>
    <br>
    <p v-if="error" class="red">{{error}}</p>
  </div>
</template>

<script>
import DCUtils from '@/utils/DwellerContract';
import Vault74Registry from '@/utils/Vault74Registry';

export default {
  name: 'ChangeUsername',
  props: ['close', 'refresh'],
  data() {
    return {
      username: this.$store.state.username,
      error: false,
    };
  },
  methods: {
    async changeUsername() {
      const dwellerIDContract = await Vault74Registry
        .getDwellerContract(this.$store.state.activeAccount);

      this.$store.commit('setStatus', 'Transaction created, waiting for confirm');
      DCUtils.setUsername(
        dwellerIDContract,
        this.$store.state.activeAccount,
        this.username,
        () => {
          this.close();
          this.$store.commit('setStatus', 'Transaction completed');
          this.$store.commit('username', this.username);
        },
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .change-photo {
    float: right;
  }
</style>
