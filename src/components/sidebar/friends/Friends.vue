<template>
  <section :class="`user ${(active == 'true') ? 'user-active' : ''}`" >
    Friends
  </section>
</template>

<script>
export default {
  name: 'Friends',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
