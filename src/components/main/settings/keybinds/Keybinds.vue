<template>
  <div>
    <h3 class="label">Keybinds</h3>
    <article class="message is-dark">
      <div class="message-body">
        <h2>Default Keybinds</h2>
        <p>Below are a list of the current keybinds, right now they are not configurable.</p>
        <br>
        <br>
        <div class="columns">
          <div class="column">
            <p class="label">Toggle Mute</p>
            <input class="input" value="ALT + M" readonly />
            <br>
            <br>
            <p class="label">Toggle Deafen</p>
            <input class="input" value="ALT + D" readonly />
          </div>
          <div class="column">
            <p class="label">Open Settings</p>
            <input class="input" value="ALT + S" readonly />
            <br>
            <br>
            <p class="label">Call Active Window</p>
            <input class="input" value="ALT + C" readonly />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Keybinds',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
