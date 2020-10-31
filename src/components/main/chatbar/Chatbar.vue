<template>
    <div>
        <DwellerID :active="active" :toggle="toggleFingerprint" />
        <section class="chat-group">
            <div class="input-collection">
                <i class="fas fa-arrow-circle-right send" v-on:click="sendMessage"></i>
                <i class="far fa-smile-wink emoji" v-on:click="toggleEmoji"></i>
                <i class="fas fa-fingerprint fingerprint" v-on:click="toggleFingerprint"></i>
                <i class="fas fa-upload upload"></i>
                <picker 
                  v-if="selectingEmoji"
                  native 
                  :data="emojiIndex"
                  title="Pick your emoji…" 
                  emoji="point_up" 
                  color="#00d0a1"
                  showPreview="false"
                  @select="this.selectEmoji"/>
                <input 
                  class="input is-small messageuser" 
                  type="text" 
                  placeholder="Securley Message Sophie Chain..."
                  v-model="messageText"
                  v-on:keyup.enter="sendMessage">
                <!--<div class="input is-small messageuser" contenteditable role="textbox">
                  Securley Message Sophie Chain...
                </div>-->
            </div>
        </section>
    </div>
</template>

<script>
import data from '@/components/main/chatbar/emojidata.json';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
import DwellerID from '@/components/main/dwellerid/DwellerID';
import 'emoji-mart-vue-fast/css/emoji-mart.css';

const emojiIndex = new EmojiIndex(data);

export default {
  name: 'ChatGroup',
  props: ['handleNewMessage'],
  components: {
    DwellerID,
    Picker,
  },
  data() {
    return {
      active: false,
      messageText: '',
      selectingEmoji: false,
      emojiIndex,
    };
  },
  methods: {
    toggleFingerprint() {
      this.active = !this.active;
    },
    toggleEmoji() {
      this.selectingEmoji = !this.selectingEmoji;
    },
    sendMessage() {
      if (this.messageText.replace(' ', '') !== '') {
        this.handleNewMessage(this.messageText);
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
<style scoped>
    .emoji-mart {
      position: absolute;
      top: -26rem;
      right: 1rem;
    }
    .modal-card {
        margin-top: 0;
        border-radius: 5px;
    }
    .modal-card-head {
        background: #fff;
        border-radius: none !important;
    }
    .chat-group {
        position: absolute;
        bottom: 2rem;
        right: 0;
        left: 0;
        height: 5rem;
        padding: 1rem;
    }
    .input-collection {
        background: #e7ebee;
        border-radius: 5px;
        width: 100%;
        height: 100%;
    }
    .input-collection i {
        color: #666;
        cursor: pointer;
    }
    .send {
        position: absolute;
        right: 2.2rem;
        top: 1.85rem;
        font-size: 16pt;
    }
    .upload {
        position: absolute;
        left: 2.2rem;
        top: 1.85rem;
        font-size: 16pt;
    }
    .fingerprint {
        position: absolute;
        right: 4.75rem;
        top: 1.85rem;
        font-size: 16pt;
    }
    .emoji {
        position: absolute;
        right: 6.95rem;
        top: 1.85rem;
        font-size: 16pt;
        cursor: pointer;
    }
    .messageuser {
        margin-left: 3rem;
        margin-top: 0.25rem;
        background: transparent;
        border: none;
        box-shadow: none;
        font-size: 12pt;
        width: calc(100% - 10.2rem);
    }
    input:focus, input:focus{
        outline: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: none !important;
    }
    input::placeholder {
        color: #666;
        opacity: 0.75;
    }
    i:hover {
      color: #000;
    }
</style>
