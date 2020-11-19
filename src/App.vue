<template>
  <div id="app" :class="`${this.$store.state.settings.darkMode ? 'dark' : ''}`">
    <!--
    <header>
      <router-link :to="{ name: 'home' }">Vue.js PWA</router-link>
      <router-link :to="{ name: 'router' }">Router</router-link>
      <router-link :to="{ name: 'store' }">Store</router-link>
    </header>
    -->
    <main id="main" class="theme">
      <transition appear mode="out-in" name="slide-fade">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import config from '@/config/config';
import Peer2Peer from '@/classes/Peer2Peer';

export default {
  name: 'app',
  mounted() {
    window.Vault74 = {};
    // If we have an account, go ahead and mount to the account
    // else wait a bit and try again.
    const checkAccount = () => {
      if (this.$store.state.activeAccount) {
        // Attach to peers
        window.Vault74.Peer2Peer = window.Vault74.Peer2Peer || new Peer2Peer(this.$store.state.activeAccount);
        window.Vault74.Peer2Peer.createChannels(this.$store.state.friends);
        return;
      }
      setTimeout(checkAccount, config.peer.timeout);
    };
    checkAccount();
    // Connect when a new friend is added
    // TODO: In the future we'll only want to ping friends
    // we have active chats with.
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'addFriend') {
        // Connect to new peer.
        console.log('add friend', state);
        window.Vault74.Peer2Peer.createChannels(state.friends);
      }
    });
  },
};
</script>

<style scoped lang="less">

#app {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  min-width: 990px;
}
</style>

<style lang="less" src="@/assets/styles/bulma.less"></style>
<style lang="less" src="@/assets/styles/app.less"></style>
<style lang="less">
.dark {
  @import "assets/styles/true_dark.less";
}
</style>