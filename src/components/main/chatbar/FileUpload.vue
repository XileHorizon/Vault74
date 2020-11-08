<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <img v-if="file" :src="getURL()" />
          </div>
          <div class="column">
            <h3 class="heading">Upload File</h3>
              Uploading a file will store your file on the IPFS blockchain and automatically send the file in chat.
              <br>
              <br>
              <span class="heading">File</span>
              <input readonly :value="getURL()" class="input" type="text" />
              <span class="heading">IPFS Link</span>
              <input 
                v-if="ipfsHash"
                autofocus
                readonly
                :value="`https://ipfs.io/ipfs/${ipfsHash}`"
                class="input"
                type="text" />
              <div class="heading" v-else>
                Uploading to IPFS...
              </div>
              <input 
                autofocus
                value=" "
                class="hidden"
                ref="hidden"
                type="text" 
                v-on:keyup.enter="sendFileMessage"/>
              <button 
                :disabled="!ipfsHash"
                class="button is-primary"
                autofocus 
                v-on:click="sendFileMessage">
                {{ipfsHash ? 'Send File' : 'Uploading...'}}
              </button>
              <i class="fa fa-times close" v-on:click="close"></i>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: ['file', 'handleNewMessage', 'close'],
  data() {
    return {
      link: false,
      ipfsHash: false,
    };
  },
  methods: {
    getURL() {
      this.sendToIpfs(this.file);
      return URL.createObjectURL(this.file);
    },
    sendFileMessage() {
      if (this.ipfsHash) {
        this.handleNewMessage(`https://ipfs.io/ipfs/${this.ipfsHash}`, 'image');
        this.$store.commit('addRecentFile', {
          url: `https://ipfs.io/ipfs/${this.ipfsHash}`,
          hash: this.ipfsHash,
          filename: this.file.name,
        });
        this.close();
      }
    },
    async sendToIpfs(file) {
      const ipfsResponse = await window.ipfs.add(file);
      this.ipfsHash = ipfsResponse.path;
      this.$nextTick(() => {
        console.log('this.refs', this.$refs.hidden);
        this.$refs.hidden.focus();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    max-width: 300px;
    max-height: 300px;
  }
  .hidden {
    width: 0;
    height: 0;
    opacity: 0;
    color: transparent;
    overflow: hidden;
  }
  .modal-card-body {
    min-height: 333px;
  }
  .is-primary {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  }
  .close {
    position: absolute;
    top: 0.75rem;
    right: 0.85rem;
    color: #000;
    cursor: pointer;
  }
</style>
