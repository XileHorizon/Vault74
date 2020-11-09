<template>
  <div>
    <h3 class="label">Appearance</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Dark Theme</h2>
        <p>Enable dark theme for an easy on the eyes version of Vault74.</p>
        <br>
        <button class="button is-dark is-small" v-on:click="toggleDarkMode">
          {{settings.darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}}
        </button>
      </div>
    </article>
    <h3 class="label">Permissions</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Notifications</h2>
        <p>Click to enable notifications with Vault74 for a better experience.</p>
        <br>
        <button 
          class="button is-dark is-small" 
          :disabled="notificationsEnabled"
          v-on:click="enableNotifications">
          {{ notificationsEnabled ? 'Notifications Enabled!' : 'Enable Notificaions' }}
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Personalize',
  props: ['settings', 'setSetting'],
  data() {
    return {
      notificationsEnabled: Notification.permission === 'granted',
    };
  },
  methods: {
    enableNotifications() {
      Notification.requestPermission().then((permission) => {
        this.notificationsEnabled = permission === 'granted';
      });
    },
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
