<template>
  <div class="servers">
      <CircleIcon color="#00d0a1" icon="fa fa-search" />
      <hr class="divider">
      <div class="server">
        <CircleIcon image="https://www.logolynx.com/images/logolynx/91/9147cbcba879619a4fa14ec70fd06fb0.jpeg" />
      </div>
      <div class="server">
        <CircleIcon image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
      </div>
      <div class="server">
        <CircleIcon image="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" />
      </div>
      <div class="server">
        <CircleIcon image="https://i.imgur.com/GX0qzK1.jpg" />
      </div>
      <CircleIcon color="#1f2029" icon="fa fa-plus" />
  </div>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'Servers',
  components: {
    CircleIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .servers {
        position: absolute;
        width: 5rem;
        top: 0;
        bottom: 0;
        left: -4.5rem;
        text-align: center;
        padding-top: 0.65rem;
    }
    .servers .small {
        color: #ccc;
    }
    .server p{
        font-size: 8pt;
        padding: 0;
        margin-top: 0;
    }
    .server .circle-icon {
        transition: border-radius 0.2s;
        margin-bottom: 1rem;
        border-radius: 30%;
    }
    .server .circle-icon:hover {
        border-radius: 10%;
        cursor: pointer;
    }
    .server:hover {
        cursor: pointer;
    }
</style>
