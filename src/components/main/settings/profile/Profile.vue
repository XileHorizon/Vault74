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
        <img :src="`${config.ipfs.browser}${$store.state.profilePictureHash}`" class="preview">
        <br>
        <br>
        <p class="label">Display Name</p>
        <input class="input" :value="$store.state.username" readonly />
        <br>
        <br>
        <p class="label">Account Address</p>
        <p>This is like your ID card, share this with friends so they can add you.</p>
        <input class="input" :value="$store.state.activeAccount" readonly />
        <hr>
        <button class="button is-primary is-small" v-on:click="getDweller" v-if="!this.dweller">Advanced Details</button>
        <div v-if="this.dweller">
          <p class="label">Dweller Address</p>
          <input class="input" :value="$store.state.dwellerAddress" readonly />
          <p class="label">Dweller Owner Address</p>
          <input class="input" :value="this.dweller[0]" readonly />
          <p class="label">Name</p>
          <input class="input" :value="this.dweller[1]" readonly />
          <p class="label">Photo Hash</p>
          <input class="input" :value="this.onChainPhotoHash" readonly />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import config from '@/config/config';
import DCUtils from '@/utils/DwellerContract';
import Vault74Registry from '@/utils/Vault74Registry';

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
      dweller: false,
      onChainPhotoHash: false,
      config,
    };
  },
  mounted() {
    Vault74Registry.getDwellerContract(this.$store.state.activeAccount);
  },
  methods: {
    async submitProfileContract() {
      if (this.$store.state.username.length < 5) {
        this.error = 'Your username needs to be at least 5 characters.';
        return;
      }
      this.created = true;
      Vault74Registry.createDwellerId(
        this.$store.state.username,
        this.$store.state.activeAccount,
        (transactionHash) => {
          this.transactionHash = transactionHash;
        },
        (confirmationNumber, receipt) => {
          this.confirmation = confirmationNumber;
          this.finishProfile(receipt);
        },
      );
    },
    async onFileChange(e) {
      const file = e.target.files[0];
      this.profileFile = URL.createObjectURL(file);
      if (!file.type.includes('image')) {
        this.error = 'Please use an image for your profile picture.';
        return;
      }
      this.error = false;
      const ipfsResponse = await window.ipfs.add(file);
      this.ipfsHash = ipfsResponse;
    },
    async finishProfile(receipt) {
      if (!this.ipfsHash) {
        this.commitEverything(receipt);
        return;
      }

      const dwellerIDContract = await Vault74Registry
        .getDwellerContract(this.$store.state.activeAccount);

      DCUtils.setPhoto(
        dwellerIDContract,
        this.$store.state.activeAccount,
        this.ipfsHash,
        () => {
          this.finished = true;
          this.commitEverything(dwellerIDContract);
        },
      );
    },
    commitEverything(dwellerIDContract) {
      this.$store.commit('profilePictureHash', this.ipfsHash.path);
      this.$store.commit('dwellerAddress', dwellerIDContract);
    },
    async getDweller() {
      // TODO: get the deweller address from the registry instead.
      DCUtils.getDweller(
        this.$store.state.dwellerAddress,
        (dweller, onChainPhotoHash) => {
          this.dweller = dweller;
          this.onChainPhotoHash = onChainPhotoHash;
        },
      );
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
