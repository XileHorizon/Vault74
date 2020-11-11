<template>
  <div class="columns">
    <button class="modal-close is-large" aria-label="close" v-on:click="toggleSettings"></button>
    <div class="column is-one-third settings-left" style="max-width: 300px;">
      <h1 id="logo">Settings</h1>
      <aside class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li v-on:click="setRoute('personalize')">
            <a :class="`${route == 'personalize' ? 'active' : ''}`">Personalize</a>
          </li>
          <li v-on:click="setRoute('profile')">
            <a :class="`${route == 'profile' ? 'active' : ''}`">Profile</a>
          </li>
          <li><a>Audio &amp; Video</a></li>
          <li v-on:click="setRoute('keybinds')">
            <a :class="`${route == 'keybinds' ? 'active' : ''}`">Keybinds</a>
          </li>
          <li v-on:click="setRoute('accounts-devices')">
            <a :class="`${route == 'accounts-devices' ? 'active' : ''}`">Accounts &amp; Devices</a>
          </li>
        </ul>
        <p class="menu-label">
          Networks &amp; Services
        </p>
        <ul class="menu-list">
          <li><a>Encryption</a></li>
          <li v-on:click="setRoute('storage')">
            <a :class="`${route == 'storage' ? 'active' : ''}`">Storage &amp; History</a>
          </li>
          <li v-on:click="setRoute('network')">
            <a :class="`${route == 'network' ? 'active' : ''}`">Network</a>
          </li>
        </ul>
        <p class="menu-label">
          Transactions
        </p>
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside>
    </div>
    <div class="column settings-right">
      <Personalize 
        v-if="route == 'personalize'" 
        :settings="settings"
        :setSetting="setSetting"/>
      <Keybinds 
        v-if="route == 'keybinds'" 
        :settings="settings"
        :setSetting="setSetting"/>
      <Profile 
        v-if="route == 'profile'" 
        :settings="settings"
        :setSetting="setSetting"/>
      <Accounts 
        v-if="route == 'accounts-devices'" 
        :settings="settings"
        :setSetting="setSetting"/>
      <Network 
        v-if="route == 'network'" 
        :settings="settings"
        :setSetting="setSetting"/>
      <Storage 
        v-if="route == 'storage'" 
        :settings="settings"
        :setSetting="setSetting"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Personalize from '@/components/main/settings/personalize/Personalize';
import Profile from '@/components/main/settings/profile/Profile';
import Keybinds from '@/components/main/settings/keybinds/Keybinds';
import Accounts from '@/components/main/settings/accounts/Accounts';
import Network from '@/components/main/settings/network/Network';
import Storage from '@/components/main/settings/storage/Storage';

export default {
  name: 'Settings',
  computed: {
    ...mapState(['settings']),
  },
  components: {
    Personalize,
    Profile,
    Keybinds,
    Accounts,
    Network,
    Storage,
  },
  props: ['toggleSettings'],
  data() {
    return {
      route: 'personalize',
    };
  },
  methods: {
    ...mapMutations(['setSetting']),
    setRoute(route) {
      this.route = route;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      font-size: 16pt;
      padding: 0.5rem;
      line-height: 0;
      height: 30px;
      width: 30px;
      border: none;
    }
    .close i {
      margin: 0;
      line-height: 0;
    }
    #logo {
      font-family: 'Major Mono Display', monospace;
      font-size: 20pt;
      padding-top: 0;
      padding-bottom: 2rem;
    }
    .columns {
      height: 100%;
      position: relative;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
    }
    .settings-left {
      padding: 3rem;
      background: #fff;
      height: 100%;
    }
    .settings-right {
      padding: 3rem;
      padding-right: 3rem;
      height: 100%;
      overflow-y: scroll;
    }
    .menu a:hover {
      color: #00d0a1;
    }
    .active {
      background: #ccc;
      color: black;
    }
</style>
