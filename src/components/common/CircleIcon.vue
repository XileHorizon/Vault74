<template>
    <div class="circle-icon" :style="`background-image:url('${image}'); background-size: contain; background-color: ${(color) ? color : '#00d0a1'};`">
        <span v-if="icon">
            <i :class="icon"></i>
        </span>
    </div>
</template>

<script>
export default {
  name: 'CircleIcon',
  props: [
    'image',
    'color',
    'icon',
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .circle-icon {
        width: 45px;
        height: 45px;
        padding: 0.40rem;
        font-size: 16pt;
        text-align: center;
        border-radius: 50%;
        background: #00d0a1;
        margin: 0 auto;
        color: #fff;
    }

</style>
