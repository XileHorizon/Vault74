<template>
  <div id="wrapper">
    <Web3 />
    <div :class="`columns wrapper ${settingsOpen ? 'settings-open' : ''}`">
      <div class="column is-one-third" style="max-width: 320px;">
        <Sidebar :toggleSettings="toggleSettings"/>
      </div>
      <div class="column">
        <Main :class="$store.state.mainRoute == 'main' ? 'show' : 'hidden'" />
        <Files v-if="$store.state.mainRoute == 'files'"/>
        <Friends v-if="$store.state.mainRoute == 'friends'"/>
      </div>
    </div>
    <div :class="`settings ${settingsOpen ? 'settings-open-container' : ''}`">
      <Settings :toggleSettings="toggleSettings" />
    </div>
    <div class="footer">
      <p>
        <i :class="`fas fa-heartbeat ${($store.state.p2pOnline) ? 'green' : 'red'}`"></i> P2P
        <span class="spacer"> </span> 
        <i class="fas fa-info-circle"></i>
        {{$store.state.status}}
        <span class="spacer"></span>
        <span v-if="$store.state.accounts">
          <i class="fab fa-ethereum"></i>
          <b>Network:</b> {{$store.state.web3Stats.nettype.toUpperCase()}}
          <span class="spacer"> </span> 
          <i class="fas fa-hashtag"></i>
          <b>Block Number:</b> {{$store.state.web3Stats.blockNumber}} 
          <span class="spacer"> </span> 
          <i class="fas fa-id-badge"></i>
          <b>Account:</b> {{$store.state.accounts[0]}}
        </span>
        <span v-else>
          Connecting...
        </span>
        <span class="spacer"> </span> 
        <i :class="`fas fa-moon ${darkmode ? 'green' : ''}`" v-on:click="toggleDarkMode"></i>
      </p>
    </div>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap';
import Sidebar from '@/components/sidebar/Sidebar/Sidebar';
import Main from '@/components/main/Main/Main';
import Files from '@/components/files/Files/Files';
import Friends from '@/components/friends/Friends/Friends';
import Settings from '@/components/main/settings/Settings';
import Web3 from '@/components/Web3/Web3';
import IPFS from 'ipfs-core';

export default {
  name: 'chat',
  components: {
    Sidebar,
    Main,
    Files,
    Friends,
    Settings,
    Web3,
  },
  data() {
    return {
      msg: 'Chat',
      settingsOpen: false,
      network: '',
      account: 0x0,
      blockNumber: 0,
      darkmode: localStorage.getItem('dark-theme'),
    };
  },
  methods: {
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
      if (this.settingsOpen) this.$store.commit('changeRoute', 'main');
    },
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
    },
  },
  async mounted() {
    Mousetrap.bind('option+s', () => {
      this.settingsOpen = !this.settingsOpen;
    });
    Mousetrap.bind('esc', () => {
      this.settingsOpen = false;
      this.$store.commit('changeRoute', 'main');
    });
    const ipfs = await IPFS.create();
    window.ipfs = ipfs;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hidden {
    display: none;
  }
  .show {
    display: block;
  }
  #wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .settings {
    position: absolute;
    top: 0;
    z-index: 3;
    right: -100vw;
    left: 100vw;
    bottom: 0;
    background: #e7ebee;
    transition: left 0.1s linear, right 0.1s linear;
  }
  .settings-open-container {
    right: 0;
    left: 0;
  }
  .fas {
    font-size: 8pt;
  }
  .wrapper {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 3.8rem;
    margin: 0;
    border-left: 1px solid #e7ebee;
    transition: left 0.1s linear, right 0.1s linear;
  }
  .settings-open {
    left: -100vw;
    right: 100vw;
    max-width: 100vw;
  }
  .footer {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: calc(100% - 2rem);
    padding: 0.3rem 1.75rem;
    border-top: 1px solid #e7ebee;
    background: #fff;
    font-size: 10pt;
    color: #666;
  }
  .column {
    margin: 0;
    padding: 0;
  }
  .spacer {
    width: 15px;
    height: 100%;
    display: inline-block;
  }
  .fa-moon {
    cursor: pointer;
  }
  .red {
    color: #e74c3c;
  }
  .green {
    color: #00d0a1;
  }
</style>
