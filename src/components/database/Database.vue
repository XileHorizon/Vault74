<template></template>
<script>
import { PrivateKey } from '@textile/hub';

export default {
  name: 'database',
  methods: {
    startup() {
      this.$store.commit('fetchFriends');
    },
    async getIdentity() {
      /** Restore any cached user identity first */
      const cached = localStorage.getItem('textile.identity');
      if (cached !== null) {
        /** Convert the cached identity string to a PrivateKey and return */
        return PrivateKey.fromString(cached);
      }
      /** No cached identity existed, so create a new one */
      const identity = await PrivateKey.fromRandom();
      /** Add the string copy to the cache */
      // TODO: Encrypt this with user password in the future
      localStorage.setItem('textile.identity', identity.toString());
      /** Return the random identity */
      return identity;
    },
  },
  async mounted() {
    const identity = await this.getIdentity();
    console.log('identity', identity);
    console.log('pin', window.v74pin);
    this.$database.authenticate(this.$store.state.activeAccount, window.v74pin);
    window.Vault74.Database = this.$database;
    this.startup();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
