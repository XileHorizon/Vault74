<template>
  <div>
    <div id="scrollBottom" v-if="showScrollToBottom" v-on:click="scrollToEnd">
      <i class="fas fa-chevron-down"></i>
    </div>
    <div 
      id="conversation"
      :class="`${(mediaOpen) ? 'media-open' : 'media-closed'} ${(voice) ? 'media-voice' : ''}`"
      ref="chat"
      :key="`${$store.state.activeAccount}::${$store.state.activeChat}`"
      v-on:scroll="onScroll">
        <div
          v-for="messageGroup in $store.state.messages[`${$store.state.activeAccount}::${$store.state.activeChat}`]" 
          v-bind:key="messageGroup[0].id">
          <MessageBody :messages="messageGroup" :scrollToEnd="scrollToEndConditionally"/>
          <!--<Divider :text="message.text" v-if="message.type =='message-group-divider'" />-->
        </div>
    </div>
  </div>
</template>

<!--
  conversation.vue
  This component houses the current active conversation
-->
<script>
import MessageBody from '@/components/main/conversation/message/messagebody/MessageBody';
import Divider from '@/components/common/Divider';

export default {
  name: 'Conversation',
  props: [
    'messages',
    'sendMessage',
    'mediaOpen',
    'voice',
  ],
  components: {
    MessageBody,
    Divider,
  },
  data() {
    return {
      showScrollToBottom: false,
      scrollTimeout: false,
    };
  },
  methods: {
    /** @method
     * Rudementary scrolling to the bottom of the
     * div when a message comes in, or on other events
     * @name scrollToEnd
     */
    scrollToEnd() {
      const { chat } = this.$refs;
      if (!chat) return;
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
        this.showScrollToBottom = false;
      }, 50);
    },
    /** @method
     * Scrolls to the end if the user isn't looking through message
     * history to prevent annoying jumping
     * @name scrollToEndConditionally
     */
    scrollToEndConditionally() {
      const { chat } = this.$refs;
      if (!chat) return;
      if (chat.scrollTop - chat.scrollHeight > -750) {
        this.scrollToEnd();
      }
    },
    /** @method
     * If we've scrolled past a certain point we will
     * display the scroll to bottom button
     * @name onScroll
     */
    onScroll() {
      const { chat } = this.$refs;
      if (!chat) return;
      if (chat.scrollTop - chat.scrollHeight < -750) {
        this.showScrollToBottom = true;
      } else {
        this.showScrollToBottom = false;
      }
    },
  },
  watch: {
    mediaOpen: 'scrollToEnd',
  },
  beforeDestroyed() {
    clearTimeout(this.scrollTimeout);
  },
  mounted() {
    this.$nextTick(() => this.scrollToEnd());
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'activeChat') {
        this.$nextTick(() => this.scrollToEnd());
      }
      if (mutation.type === 'updateMessages') {
        this.scrollToEndConditionally();
      }
    });
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    #conversation {
      position: absolute;
      top: 3rem;
      left: 0;
      right: 0;
      bottom: 7.5rem;
      padding: 0.5rem 0.4rem;
      overflow-y: scroll;
      transition: top ease-in-out 0.05s;
      background: #f8f9fb;
      scrollbar-width: thin;
    }
    .media-open {
      top: 23rem !important;
    }
    .media-voice {
      top: 16rem !important;
    }
    #scrollBottom {
      position: absolute;
      right: 2rem;
      bottom: 8rem;
      z-index: 2;
      background: #00d0a1;
      color: #fff;
      border-radius: 5px;
      padding: 0.5rem 1rem;
    }
    #scrollBottom:hover {
      cursor: pointer;
      background: #02ddaa;
    }
</style>
