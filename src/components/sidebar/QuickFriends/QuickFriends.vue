<template>
  <div class="modal-card bordered" v-click-outside="close">
    <div class="modal-card-head">
      <p class="header">
        <span class="label">Chat With Friends</span>
        <span class="close" v-on:click="close">×</span>
        <input class="input is-small searchuser" type="text" placeholder="Find Friend...">
      </p>
    </div>
    <div class="modal-card-body">
      <div class="friends-list">
        <div v-for="fr in $store.state.friends" class="friend" :key="fr.address">
          <div class="columns">
            <div class="column is-one-quarter">
              <CircleIcon :image="fr.photo" />
            </div>
            <div class="column is-half nameholder">
              <p>
                {{fr.name}}<br />
                <span class="address">{{fr.address}}</span>
              </p>
            </div>
            <div class="column is-one-quarter">
              <button
                class="button is-small is-primary"
                v-on:click="handleChat(fr)">
                <i class="fas fa-comment-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'QuickFriends',
  props: ['close'],
  components: {
    CircleIcon,
  },
  methods: {
    handleChat(fr) {
      this.$store.commit('activeChat', fr.address);
      this.close();
    },
  },
  /* eslint-disable */
  directives: {
    'click-outside': {
      bind: (el, binding) => {
        let clickedOffOnce = false;
        // Define ourClickEventHandler
        const ourClickEventHandler = event => {
          if (!el.contains(event.target) && el !== event.target) {
            if (clickedOffOnce) {
              // as we are attaching an click event listern to the document (below)
              // ensure the events target is outside the element or a child of it
              binding.value(event); // before binding it
            }
          }
          clickedOffOnce = true;
        };
        // attached the handler to the element so we can remove it later easily
        el.__vueClickEventHandler__ = ourClickEventHandler;

        // attaching ourClickEventHandler to a listener on the document here
        document.addEventListener("click", ourClickEventHandler);
      },
      unbind: function(el) {
        // Remove Event Listener
        document.removeEventListener("click", el.__vueClickEventHandler__);
      }
    }
  },
  /* eslint-enable */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .address {
    font-size: 8pt;
  }
  .friend {
    margin: 1.3rem 0;
    padding: 0 0.5rem;
    border-radius: 5px;
  }
  button {
    height: 100%;
  }
  .circle-icon {
    height: 35px;
    width: 35px;
  }
  .friends-list {
    height: 230px;
    overflow-y: scroll;
    scrollbar-width: thin;
  }
  .nameholder {
    padding-top: 0.8rem;
    overflow: hidden;
    line-height: 90%;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }
  .modal-card {
    position: absolute;
    z-index: 10;
    width: 300px;
    top: 13.5rem;
    right: -285px;
  }
  .modal-card-body {
    padding: 0.5rem 1rem 1rem 1rem;
  }
  .modal-card-head {
    padding: 0.5rem 1rem;
  }
  .header {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
