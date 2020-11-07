<template>
  <div>
    <h3 class="label">Profile</h3>
    <article class="message is-dark">
      <div class="message-body" v-if="!this.$store.state.dwellerAddress">
        <h2>Setup Account</h2>
        <p>Your account is not setup yet, let's get that going! It only takes a moment.</p>
        <br>
        <div v-if="!this.created">
          <div class="columns">
            <div class="column is-one-fifth">
              <img :src="profileFile" class="preview">
            </div>
            <div class="column is-four-fifths">
              <p class="label">Profile Picture (Optional)</p>
              <input class="input" type="file" @change="onFileChange" />
              <span v-if="profileFile && !ipfsHash">Uploading to IPFS...</span>
              <small class="address">{{ipfsHash.path}}</small>
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-fifth">
            </div>
            <div class="column is-four-fifths">
              <p class="label">Username</p>
              <input v-model="$store.state.username" class="input" placeholder="Username" />     
            </div>
            <p v-if="error">{{error}}</p>
          </div>
          <p style="text-align: right;">
            <button 
              class="button is-primary" 
              :disabled="profileFile && !ipfsHash"
              v-on:click="submitProfileContract">Create Account</button>
          </p>
        </div>
        <div v-else>
          <p>
            <span class="heading">Creating Transaction</span>
            <span :class="`${created ? 'light' : 'dark'}`">Please approve the transaction on your wallet or MetaMask.</span>
          </p>
          <br>
          <p>
            <span :class="`${transactionHash ? 'light' : 'dark'} heading`">Sending Transaction</span>
            <span :class="`${transactionHash ? 'light' : 'dark'}`">Please wait while your transaction is sent...</span>
          </p>
          <br>
          <p>
            <span :class="`${confirmation ? 'light' : 'dark'} heading`">Confirming Transaction</span>
            <span :class="`${confirmation ? 'light' : 'dark'}`">Don't Leave! we're waiting for a confirmation...</span>
          </p>
          <br>
          <p>
            <span :class="`${finished ? 'light' : 'dark'} heading`">Last Steps!</span>
            <span :class="`${finished ? 'light' : 'dark'}`">We're just taking care of some last minute things...</span>
          </p>
        </div>
      </div>
      <div class="message-body" v-else>
        <h2>Your Account</h2>
        <p>Browse your account info, and make changes.</p>
        <br>
        <img :src="`https://ipfs.io/ipfs/${$store.state.profilePictureHash}`" class="preview">
        <p class="label">DwellerID Address</p>
        <input class="input" :value="$store.state.dwellerAddress" readonly />
      </div>
    </article>
  </div>
</template>

<script>
import IPFS from 'ipfs-core';
import * as DwellerID from '@/contracts/DwellerID.json';

export default {
  name: 'Profile',
  data() {
    return {
      profileFile: false,
      ipfsHash: false,
      error: false,
      created: false,
      transactionHash: false,
      confirmation: false,
      finished: false,
    };
  },
  methods: {
    async submitProfileContract() {
      if (this.$store.state.username.length < 5) {
        this.error = 'Your username needs to be at least 5 characters.';
        return;
      }
      const username = window.web3.utils.fromAscii(this.$store.state.username);
      const contract = new window.web3.eth.Contract(DwellerID.abi);
      contract.options.data = DwellerID.data.bytecode.object;
      this.created = true;
      contract.deploy({
        arguments: [username],
      }).send({
        from: this.$store.state.activeAccount,
        gas: 4700000,
      })
        .once('error', (error) => {
          console.log('error', error);
        })
        .once('transactionHash', (transactionHash) => {
          this.transactionHash = transactionHash;
        })
        .once('confirmation', (confirmationNumber, receipt) => {
          this.confirmation = confirmationNumber;
          this.finishProfile(receipt);
        });
    },
    async onFileChange(e) {
      const file = e.target.files[0];
      this.profileFile = URL.createObjectURL(file);
      const ipfs = await IPFS.create();
      const ipfsResponse = await ipfs.add(file);
      this.ipfsHash = ipfsResponse;
    },
    finishProfile(receipt) {
      if (!this.ipfsHash) {
        this.commitEverything(receipt);
        return;
      }
      const contract = new window.web3.eth.Contract(DwellerID.abi, receipt.contractAddress);
      contract.methods.setPhoto([
        window.web3.utils.fromAscii(this.ipfsHash.path.substring(0, 32)),
        window.web3.utils.fromAscii(this.ipfsHash.path.substring(32, this.ipfsHash.length - 1)),
      ])
        .send({
          from: this.$store.state.activeAccount,
          gas: 4700000,
        })
        .once('transactionHash', () => {
          this.finished = true;
          this.commitEverything(receipt);
        });
    },
    commitEverything(receipt) {
      this.$store.commit('profilePictureHash', this.ipfsHash.path);
      this.$store.commit('dwellerAddress', receipt.contractAddress);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .is-one-fifth {
    text-align: center;
  }
  .light {
    opacity: 1;
  }
  .dark {
    opacity: 0.3;
  }
  .preview {
    width: 75px;
    height: 75px;
    border-radius: 37.5px;
    background:aquamarine;
    margin-top: 0.5rem;
  }
  .address {
    font-size: 9pt;
  }
</style>
