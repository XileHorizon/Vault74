<template>
  <div id="friends">
    <button class="modal-close is-large" aria-label="close" v-on:click="close"></button>
    <h3>Friends</h3>
    <p>Get connected with other people on the Vault74 platform.</p>
    <h2 class="label">Find Someone</h2>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Add a Friend</h2>
        <p>Enter a friends Ethereum address below to find them...</p>
        <br>
        <div class="field has-addons" >
          <div class="control" style="width: 100%;">
            <input class="input" type="text" placeholder="0x00000000000000000000000000..." v-model="friendAddress">
          </div>
          <div class="control">
            <a class="button is-primary" v-on:click="addFriend">
              Add Friend
            </a>
          </div>
        </div>
        <div style="clear:both"></div>
        <div v-if="friend">
          <h2 class="label">We Found Someone</h2>
          <div class="friend">
            <CircleIcon :image="friend.photo" />
            <span>{{friend.name}}</span>
            <button class="button is-primary add-friend">Add</button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import config from '@/config/config';
import CircleIcon from '@/components/common/CircleIcon';
import DwellerCachingHelper from '@/utils/DwellerCachingHelper';

export default {
  name: 'Friends',
  components: {
    CircleIcon,
  },
  data() {
    return {
      friend: false,
      friendAddress: '',
      dwellerCachingHelper: new DwellerCachingHelper(config.registryAddress),
    };
  },
  methods: {
    close() {
      this.$store.commit('changeRoute', 'main');
    },
    async addFriend() {
      const friend = await this.dwellerCachingHelper.getDweller(this.friendAddress);
      this.friend = friend;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #friends {
    position: relative;
    width: 100%;
    height: calc(100% - 2rem - 1px);
    background: #f8f9fb;
    z-index: 5;
    padding: 1rem 1.5rem;
    overflow-y: scroll;
  }
  h3 {
    font-family: 'Major Mono Display', monospace;
    font-size: 20pt;
  }
  .friend {
    padding: 1rem;
    font-size: 14pt;
    background: #f8f9fb;
    border-radius: 5px;
    max-width: 350px;
  }
  .modal-close {
    z-index: 0 !important;
    position: absolute;
  }
  .circle-icon {
    float: left;
    margin-right: 1rem;
    margin-top: -0.5rem;
    margin-left: -0.1rem;
  }
  .add-friend {
    margin-top: -0.3rem;
    float: right;
  }
</style>
