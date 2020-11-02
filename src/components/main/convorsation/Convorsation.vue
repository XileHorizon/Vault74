<template>
    <div id="convorsation" ref="chat" v-on:scroll="onScroll">
        <div id="scrollBottom" v-if="showScrollToBottom" v-on:click="scrollToEnd">
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-for="message in messages" v-bind:key="message.id">
          <MessageBody :message="message" v-if="message.type == 'message-group'" />
          <Divider :text="message.text" v-if="message.type =='message-group-divider'" />
        </div>
    </div>
</template>

<script>
import MessageBody from '@/components/main/convorsation/message/MessageBody';
import Divider from '@/components/common/Divider';

export default {
  name: 'Convorsation',
  props: ['messages', 'sendMessage'],
  components: {
    MessageBody,
    Divider,
  },
  data() {
    return {
      showScrollToBottom: false,
    };
  },
  methods: {
    scrollToEnd() {
      const { chat } = this.$refs;
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
        this.showScrollToBottom = false;
      }, 100);
    },
    onScroll() {
      const { chat } = this.$refs;
      if (chat.scrollTop - chat.scrollHeight < -750) {
        this.showScrollToBottom = true;
      } else {
        this.showScrollToBottom = false;
      }
    },
  },
  watch: {
    messages: 'scrollToEnd',
  },
  mounted() {
    setTimeout(() => {
      this.scrollToEnd();
    }, 500);
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    #convorsation {
        position: absolute;
        top: 3rem;
        left: 0;
        right: 0;
        bottom: 7.5rem;
        padding: 0.5rem 0.4rem;
        overflow-y: scroll;
    }
    #scrollBottom {
      position: fixed;
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
