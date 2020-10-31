<template>
  <div id="app">
    <!--
    <header>
      <router-link :to="{ name: 'home' }">Vue.js PWA</router-link>
      <router-link :to="{ name: 'router' }">Router</router-link>
      <router-link :to="{ name: 'store' }">Store</router-link>
    </header>
    -->
    <main id="main">
      <transition appear mode="out-in" name="slide-fade">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style scoped>
#app {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
</style>

<style lang="less" src="@/assets/styles/bulma.less"></style>
<style lang="less" src="@/assets/styles/app.less"></style>
