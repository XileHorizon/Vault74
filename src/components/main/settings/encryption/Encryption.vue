<template>
  <div>
    <h3 class="label">Encryption &amp; Keys</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Public / Private Keys</h2>
        <p>Messages are encrypted with a public and private key. You can reveal your keys below. <b>DO NOT</b> share your private key with others.</p>
        <br>
        <span class="label">Public Key</span>
        <input readonly :value="key.getPublicKey()" class="input" type="text" />
        <span class="label">Private Key <small>(hover to reveal)</small></span>
        <div class="input blured" type="text">
          <span class="text">
            {{key.getPrivateKey()}}
          </span>
        </div>
        <br><br>
        <button class="button is-danger is-small">Regenerate Keys</button>
      </div>
    </article>
  </div>
</template>

<script>
import Key from '@/classes/Key.ts';

export default {
  name: 'Encryption',
  data() {
    return {
      key: new Key(window.v74Ethereum),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blured > .text {
    filter: blur(4px);
  }
  .blured:hover > .text {
    filter: blur(0px);
  }
</style>
