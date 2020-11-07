<template>
  <div id="payment">
    <a :href="message.data.link" target="_blank">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <i class="fab fa-ethereum logo"></i>
              <strong class="amount">+ {{message.data.amount}} Ether</strong><br />
              {{message.data.sender}} sent {{message.data.amount}} ETH to {{message.data.receiver}}.
              <br>
            </p>
          </div>
        </div>
      </article>
    </a>
  </div>
</template>

<script>

export default {
  name: 'Payment',
  props: [
    'message',
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .media {
    background: #fff;
    border-radius: 6px;
    border: 1px solid #eee;
    padding: 0 1rem 0.5rem 1rem;
    max-width: 400px;
    color: #666;
    position: relative;
    border-left: 4px solid #00d0a1;
  }
  .media:hover .logo {
    color: #000;
  }
  .media-content {
    padding: 0.3rem;
    font-size: 10pt;
  }
  .content {
    padding-left: 5rem;
  }
  .logo {
    font-size: 38pt;
    position: absolute;
    left: 2rem;
    top: 1.15rem;
  }
  .amount {
    color: #00d0a1;
    font-size: 15pt;
  }
  img {
    border-radius: 4px;
  }
</style>
