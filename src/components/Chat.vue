<template>
  <div id="wrapper">
    <div :class="`columns wrapper ${settingsOpen ? 'settings-open' : ''}`">
      <div class="column is-one-third" style="max-width: 320px;">
        <Sidebar :toggleSettings="toggleSettings"/>
      </div>
      <div class="column">
        <Main />
      </div>
    </div>
    <div :class="`settings ${settingsOpen ? 'settings-open-container' : ''}`">
      <p>Hey there, I haven't finished this yet.</p>
      <button class="button button-primary" v-on:click="toggleSettings">Close Settings</button>
    </div>
    <div class="footer">
      <p>
        <i class="fas fa-key"></i> Vault74
        <span class="spacer"> </span> 
        <i class="fas fa-server"></i> Hosted from IPFS 
        <span class="spacer"> </span> 
        <i class="fas fa-hashtag"></i> 12D3Koo...
        <span class="spacer"> </span> 
        <i class="fas fa-code-branch"></i> v0.0.0 - Mockup
      </p>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar';
import Main from '@/components/main/Main';

export default {
  name: 'chat',
  components: {
    Sidebar,
    Main,
  },
  data() {
    return {
      msg: 'Chat',
      settingsOpen: false,
    };
  },
  methods: {
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    padding: 0.45rem 1.75rem;
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
</style>
