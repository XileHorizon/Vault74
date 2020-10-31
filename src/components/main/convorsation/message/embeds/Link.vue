<template>
  <div>
    <a :href="message.data.link" target="_blank">{{message.data.link}}</a>
    <article class="media">
      <div class="media-content">
          <img :src="message.data.preview">
          <div class="content">
          <p>
            <strong>{{message.data.title}}</strong><br />
            <a :href="message.data.link" target="_blank">{{message.data.link}}</a>
            <br>
            {{message.data.text}}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  name: 'Link',
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
    padding: 1rem;
    max-width: 400px;
  }
  img {
    border-radius: 4px;
  }
</style>
