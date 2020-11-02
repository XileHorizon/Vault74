<template>
  <div>
    <a :href="'https://youtube.com/watch?v=' + message.data.videoId" target="_blank">https://youtube.com/watch?v={{message.data.videoId}}</a>
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{message.data.title}}</strong><br />
            {{message.data.author}}
            <br>
            <iframe width="373" height="210" :src="`https://www.youtube.com/embed/${message.data.videoId}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  name: 'YouTube',
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
    max-width: 408px;
  }
  img {
    border-radius: 4px;
  }
</style>
