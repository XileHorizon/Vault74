<template>
  <section class="make-payment">
    <div class="left-head">
        <CircleIcon image="https://randomuser.me/api/portraits/women/43.jpg" />
    </div>
    <div class="right-head">
        <p><b>{{person}}</b><br>
        <small>0xD02248C262b3690CC6eE7...</small></p>
    </div>
    <hr class="break">
    <p>
        <i class="fab fa-ethereum"></i> Send {{amount}} ether (${{amount * 391.84}})<br>
        <small><b>Balance: </b>{{$store.state.balance}} ETH</small></p>
    <input 
        class="input" 
        type="text" 
        placeholder="0.1"
        v-model="amount">
    <i class="fa fa-times close" v-on:click="toggle"></i>
    <button class="button is-primary">Send</button>
  </section>
</template>

<script>
import CircleIcon from '@/components/common/CircleIcon';

export default {
  name: 'MiniPayment',
  props: ['person', 'toggle'],
  components: {
    CircleIcon,
  },
  data() {
    return {
      amount: 0,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .break {
        visibility: hidden;
        padding-bottom: 1rem;
    }
    small {
        font-size: 9pt;
    }
    .left-head {
        width: 50px;
        float: left;
    }
    .left-head b {
        font-size: 16pt;
    }
    .right-head {
        width: cacl(100% - 50px);
        padding-left: 0.75rem;
        float: left;
    }
    .circle-icon {
        float: left;
    }
    .close {
        position: absolute;
        top: 0.75rem;
        right: 1rem;
        font-size: 9pt;
        color: #999;
    }
    .close:hover {
        cursor: pointer;
        color: #000;
    }
    .small {
        font-weight: bold;
    }
    .input {
        width: 70%;
        float: left;
    }
    .make-payment {
        position: absolute;
        right: 1rem;
        bottom: 5rem;
        background: #fff;
        padding: 0.75rem 0.75rem;
        border: 1px solid #e7ebee;
        border-radius: 6px;
        z-index: 3;
    }
    .button {
        float: right;
        width: 75px;
        margin-top: 0;
    }
</style>
