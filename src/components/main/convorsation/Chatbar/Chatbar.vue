<template src="./Chatbar.html"></template>

<script>
import data from '@/components/main/convorsation/Chatbar/emojidata.json';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
import MiniPayment from '@/components/common/payments/MiniPayment/MiniPayment';
import 'emoji-mart-vue-fast/css/emoji-mart.css';
import FileUpload from '@/components/common/FileUpload/FileUpload';

const emojiIndex = new EmojiIndex(data);

export default {
  name: 'ChatGroup',
  props: ['handleNewMessage'],
  components: {
    Picker,
    MiniPayment,
    FileUpload,
  },
  data() {
    return {
      messageText: '',
      selectingEmoji: false,
      emojiIndex,
      participantTalking: false,
      payments: false,
      characters: 0,
      limit: 250,
      file: false,
      showFileUpload: false,
    };
  },
  mounted() {
    const isTypingFunc = () => {
      this.participantTalking = !this.participantTalking;
      const int = Math.floor(Math.random() * Math.floor(15000));
      setTimeout(isTypingFunc, int);
    };
    isTypingFunc();
  },
  methods: {
    handlePaste(e) {
      for (let i = 0; i < e.clipboardData.items.length; i += 1) {
        const item = e.clipboardData.items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          this.file = file;
          this.showFileUpload = true;
        }
      }
    },
    openFileUpload() {
      this.showFileUpload = true;
    },
    closeFileUpload() {
      this.showFileUpload = false;
      this.file = false;
    },
    togglePayments() {
      this.payments = !this.payments;
    },
    toggleEmoji() {
      this.selectingEmoji = !this.selectingEmoji;
    },
    sendMessage() {
      if (this.messageText.replace(/\s+/g, '').length >= 1) {
        if (this.messageText.length > this.limit) {
          return;
        }
        this.handleNewMessage(this.messageText, 'text');
        this.messageText = '';
      }
    },
    selectEmoji(emoji) {
      this.messageText += emoji.native;
      this.selectingEmoji = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Chatbar.less"></style>
