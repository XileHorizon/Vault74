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
import MessageBroker from '@/classes/MessageBroker';

const newMessageSound = new Audio('https://ipfs.io/ipfs/QmV7bZ3RSppXePC299kfUjpdLBsAptmSDrtvvSmBJh1cmB');

export default {
  name: 'app',
  mounted() {
    this.$store.commit('ICEConnected', false);
    this.$store.commit('dwellerAddress', false);
    // If we have an account, go ahead and mount to the account
    // else wait a bit and try again.
    const checkAccount = () => {
      if (this.$store.state.activeAccount) {
        window.Vault74.messageBroker = new MessageBroker(
          this.$store.state.activeAccount,
          (data) => {
            this.$store.commit('updateMessages', data);
          },
        );
        window.Vault74.warn('No account found yet, rechecking soon.');
        // Attach to peers
        window.Vault74.Peer2Peer = window.Vault74.Peer2Peer ||
          new Peer2Peer(
            this.$store.state.activeAccount,
            (peer, type, data) => {
              switch (type) {
                case 'heartbeat':
                  this.$store.commit('peerHealth', [peer, 'alive']);
                  break;
                case 'dead':
                  this.$store.commit('peerHealth', [peer, 'dead']);
                  break;
                case 'alive':
                  this.$store.commit('ICEConnected', data);
                  break;
                case 'message':
                  window.Vault74.messageBroker.recievedMessage(
                    peer,
                    Date.now(),
                    type,
                    JSON.parse(data),
                  );
                  newMessageSound.play();
                  break;
                case 'typing-notice':
                  this.$store.commit('userTyping', [peer, JSON.parse(data).data]);
                  break;
                default:
                  break;
              }
            },
          );
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