<template>
    <div>
        <section class="chat-group">
            <MiniPayment person="Sophie Chain" v-if="payments" :toggle="togglePayments" />
            <p id="typing" class="loading" v-if="participantTalking"><b>Sophie Chain</b> is typing</p>
            <div :class="`input-collection ${messageText.length > limit ? 'input-collection-red' : ''}`">
                <p :class="`charlimit ${messageText.length > limit ? 'red' : ''}`">
                  {{(messageText.length > limit) ? limit - messageText.length : messageText.length}}/{{limit}}
                </p>
                <i class="fas fa-arrow-circle-right send" v-on:click="sendMessage"></i>
                <i class="far fa-smile-wink emoji" v-on:click="toggleEmoji"></i>
                <i class="fab fa-ethereum sendEther" v-on:click="togglePayments"></i>
                <i class="fas fa-upload upload"></i>
                <!--<MiniPayment person="Sophie Chain" :toggle="togglePayments" v-if="payments" />-->
                <picker
                  v-if="selectingEmoji"
                  native 
                  :data="emojiIndex"
                  title="Pick your emoji…" 
                  emoji="point_up" 
                  color="#00d0a1"
                  showPreview="false"
                  @select="this.selectEmoji" />
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
import MiniPayment from '@/components/main/payments/MiniPayment';
import 'emoji-mart-vue-fast/css/emoji-mart.css';

const emojiIndex = new EmojiIndex(data);

export default {
  name: 'ChatGroup',
  props: ['handleNewMessage'],
  components: {
    Picker,
    MiniPayment,
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
    togglePayments() {
      this.payments = !this.payments;
    },
    toggleEmoji() {
      this.selectingEmoji = !this.selectingEmoji;
    },
    sendMessage() {
      if (this.messageText.replace(' ', '') !== '') {
        if (this.messageText > this.limit) {
          return;
        }
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
    #typing {
      position: absolute;
      top: -0.45rem;
      left: 1rem;
      font-size: 10pt;
      color: #666;
    }
    .charlimit {
      position: absolute;
      right: 1rem;
      font-weight: bold;
      bottom: 0;
      font-size: 9pt;
    }
    .red {
      color: #ee5253;
    }
    .input-collection-red {
      border: 1px solid #ee5253;
    }
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
        right: 6.75rem;
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
    .sendEther {
        position: absolute;
        right: 4.75rem;
        top: 1.85rem;
        font-size: 16pt;
        cursor: pointer;
    }
    .sendEther i {
      font-size: 16pt;
    }
    .sendEther .fa-plus {
      font-size: 9pt;
      margin-bottom: 2rem;
    }
    .messageuser {
        margin-left: 3rem;
        margin-top: 0.25rem;
        background: transparent;
        border: none;
        box-shadow: none;
        font-size: 12pt !important;
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
    .loading:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
      animation: ellipsis steps(4,end) 900ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0px;
    }

    @keyframes ellipsis {
      to {
        width: 20px;    
      }
    }

    @-webkit-keyframes ellipsis {
      to {
        width: 20px;    
      }
    }
</style>
