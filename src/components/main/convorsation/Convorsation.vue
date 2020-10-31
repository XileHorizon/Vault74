<template>
    <div id="convorsation" ref="chat">
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
  methods: {
    scrollToEnd() {
      const { chat } = this.$refs;
      chat.scrollTop = chat.scrollHeight;
    },
  },
  mounted() {
    setTimeout(() => {
      this.scrollToEnd();
    }, 500);
  },
  updated() {
    this.scrollToEnd();
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
        bottom: 7rem;
        padding: 0.5rem 0.4rem;
        overflow-y: scroll;
    }
</style>
