<template>
    <div id="loading">
        <div :class="`loading-dispaly ${($store.state.dwellerAddress === '0x0000000000000000000000000000000000000000') ? 'showing-content' : ''}`">
            <p id="logo">Vault74</p>
            <div class="red" v-if="$store.state.criticalError">
                <i class="fas fa-skull"></i> Failure to load: {{$store.state.criticalError}} <br /><br />
                <button class="button is-danger is-small" v-on:click="reload">Retry?</button>
            </div>
            <div v-else-if="!$store.state.dwellerAddress">
                <i class="fas fa-circle-notch fa-pulse"></i> Connecting to the blockchain...
            </div>
            <div v-else-if="$store.state.dwellerAddress == '0x0000000000000000000000000000000000000000'" class="content">
                <Profile :customFinalAction="reload" />
            </div>
            <div v-else-if="!$store.state.friends">
                <i class="fas fa-circle-notch fa-pulse"></i> Assembling the hive...
            </div>
            <div v-else-if="!$store.state.ICEConnected">
                <i class="fas fa-circle-notch fa-pulse"></i> Connecting to 0.vault74.io...
            </div>
            <div class="metamask" v-if="showWeb3 && $store.state.dwellerAddress !== '0x0000000000000000000000000000000000000000'">
                <span v-if="!$store.state.dwellerAddress">
                    This is taking a bit, do you have <a href="https://metamask.io/" target="_blank">https://metamask.io/</a> installed?
                </span>
                <span v-else-if="!$store.state.ICEConnected">
                    Still loading? Vault74 may already be open in another tab.
                </span>
                <span v-else>
                    Something may have gone wrong, <a href="#" target="_blank" v-on:click="window.location.reload()">retry?</a>
                </span>
            </div>

            <p class="special-thanks">
                This is a alpha product, Please use Goerli Testnet!
            </p>
        </div>
    </div>
</template>

<script>
import Profile from '@/components/main/settings/profile/Profile';

export default {
  name: 'Loading',
  props: [
    'text',
  ],
  components: {
    Profile,
  },
  data() {
    return {
      showWeb3: false,
    };
  },
  mounted() {
    setTimeout(() => {
      if (!this.$store.state.criticalError) {
        this.showWeb3 = true;
      }
    }, 8000);
  },
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .special-thanks {
        position: absolute;
        bottom: 1rem;
        text-align: center;
        left: 0;
        right: 0;
        color: #00cec9;
    }
    .loading-image {
        height: 200px;
    }
    .visible {
        visibility: visible;
    }
    .hidden {
        visibility: hidden;
    }
    #logo {
        font-family: 'Major Mono Display', monospace;
        font-size: 35pt;
        padding-top: 1rem;
        margin-bottom: 1rem;
    }
    #loading {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #1c1a24;
        z-index: 100;
    }
    .loading-dispaly {
        margin: 0 auto;
        margin-top: calc(25% - 125px);
        width: 50%;
        height: 250px;
        text-align: center;
        font-family: 'Major Mono Display', monospace;
    }
    .showing-content {
        margin-top: 1rem;
    }
    .metamask {
        margin-top: 3rem;
    }
    .content {
        font-family: 'Open Sans', sans-serif;
        text-align: left;
    }
</style>
