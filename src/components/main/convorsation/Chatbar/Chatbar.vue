<template src="./Chatbar.html"></template>

<script>
import debounce from 'debounce';

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
      typing: false,
      payments: false,
      characters: 0,
      limit: 250,
      file: false,
      showFileUpload: false,
    };
  },
  methods: {
    // Handle the pasting of image files and start the upload of the file
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
    // When a file has been succesfully uploaded, show the uploader
    openFileUpload() {
      this.showFileUpload = true;
    },
    // Self explanatory, close the file uploader modal
    closeFileUpload() {
      this.showFileUpload = false;
      this.file = false;
    },
    // Toggles the visibility of the mini payment window
    togglePayments() {
      this.payments = !this.payments;
    },
    // Toggles visibility of the emoji picker
    toggleEmoji() {
      this.selectingEmoji = !this.selectingEmoji;
    },
    // Send a plain text message from the chatbar to the parent component
    sendMessage() {
      if (this.messageText.replace(/\s+/g, '').length >= 1) {
        if (this.messageText.length > this.limit) {
          return;
        }
        this.handleNewMessage(this.messageText, 'text');
        this.messageText = '';
      }
    },
    startTyping() {
      if (!this.typing) {
        this.typing = true;
        window.Vault74.Peer2Peer.send(
          this.$store.state.activeChat,
          'typing-notice',
          true,
        );
      }
    },
    // eslint-disable-next-line
    isTyping: debounce(function(e) {
      this.typing = false;
      window.Vault74.Peer2Peer.send(
        this.$store.state.activeChat,
        'typing-notice',
        false,
      );
    }, 2000),
    // Select an emoji from the emoji picker and append it to our message
    selectEmoji(emoji) {
      this.messageText += emoji.native;
      this.selectingEmoji = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Chatbar.less"></style>
