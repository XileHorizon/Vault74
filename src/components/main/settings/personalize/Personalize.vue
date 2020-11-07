<template>
  <div>
    <h3 class="label">Appearance</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Dark Theme</h2>
        <p>Enable dark theme for an easy on the eyes version of Vault74.</p>
        <br>
        <button class="button is-dark" v-on:click="toggleDarkMode">
          {{settings.darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}}
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Personalize',
  props: ['settings', 'setSetting'],
  methods: {
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
      window.location.reload();
    },
  },
  mounted() {
    console.log(this.settings);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
