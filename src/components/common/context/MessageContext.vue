<template>
  <div id="context" ref="menu" v-click-outside="close">
    <span class="label">MESSAGE ACTIONS</span>
    <hr class="divider">
    <ul>
      <li
        v-clipboard:copy="message.payload.data"
        v-on:click="closeSoon"
        v-if="isTextMessage()">Copy Text</li>
      <li v-if="isTextMessage()">Edit Message</li>
      <li
        v-if="isTextMessage()">Speak Message</li>
    </ul>
    <hr class="divider">
    <ul>
      <li
        v-on:click="closeSoon"
        v-clipboard:copy="message.id">Copy ID</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MessageContext',
  props: [
    'message',
    'close',
    'dweller',
    'x', 'y',
  ],
  data() {
    return {
      vcoConfig: {
        handler: this.handler,
        events: ['dblclick', 'click', 'contextmenu', 'click.right'],
      },
    };
  },
  methods: {
    closeSoon() {
      setTimeout(() => {
        this.close();
      }, 10);
    },
    isTextMessage() {
      return this.message &&
        this.message.payload.data &&
        typeof this.message.payload.data === 'string';
    },
  },
  watch: {
    /* eslint-disable */
    x: function (newVal) {
      this.$refs.menu.style.left = `${newVal}px`;
    },
    y: function (newVal) {
      this.$refs.menu.style.top = `${newVal}px`;
    },
    /* eslint-enable */
  },
  mounted() {
    this.$refs.menu.style.top = `${this.y}px`;
    this.$refs.menu.style.left = `${this.x}px`;
  },
};
</script>


<style lang="less" scoped>
  .label {
    margin: 0 !important;
    padding: 0 0.3rem !important;
  }
  .divider {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #context {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    width: 170px;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    box-shadow: 0 0 0 4px rgba(0,0,0,0.1);
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      margin: 0;
      padding: 0.25rem;
      font-size: 10pt;
      border-radius: 2px;
    }
  }
</style>