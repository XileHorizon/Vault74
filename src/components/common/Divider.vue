<template>
    <div class="separator">{{text}}</div>
</template>

<script>
export default {
  name: 'Divider',
  props: [
    'text',
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .divider {
      color: pink;
    }
    .separator {
      display: flex;
      align-items: center;
      text-align: center;
      font-weight: bold;
      color: #bbb;
      margin: 1rem 0;
      font-size: 9pt;
    }
    .separator::before, .separator::after {
      content: '';
      flex: 1;
      padding-top: 0.2rem;
      border-bottom: 1px solid #eee;
    }
    .separator::before {
      margin-right: .25em;
      margin-left: 3rem;
    }
    .separator::after {
      margin-left: .25em;
      margin-right: 3rem;
    }
</style>
