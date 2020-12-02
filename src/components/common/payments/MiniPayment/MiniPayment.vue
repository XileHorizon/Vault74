<template src="./MiniPayment.html"></template>

<script>
import config from '@/config/config';
import CircleIcon from '@/components/common/CircleIcon';
import DwellerCachingHelper from '@/utils/DwellerCachingHelper';
import MessageBroker from '@/classes/MessageBroker';

export default {
  name: 'MiniPayment',
  props: [
    'person',
    'toggle',
    'address',
  ],
  components: {
    CircleIcon,
  },
  data() {
    return {
      amount: null,
      icon: false,
      name: false,
      error: false,
      priceUsd: 0,
      messageBroker: new MessageBroker(
        this.$store.state.activeAccount,
        (data) => {
          this.$store.commit('updateMessages', data);
        },
      ),
    };
  },
  methods: {
    sendMessage(data, type) {
      if (window.Vault74.messageBroker) {
        window.Vault74.messageBroker.sentMessage(
          this.$store.state.activeChat,
          Date.now(),
          'message',
          {
            type: type || 'text',
            data,
          },
        );
      }
      window.Vault74.Peer2Peer.send(
        this.$store.state.activeChat,
        'message',
        {
          type: type || 'text',
          data,
        },
      );
    },
    async getMarketPrice() {
      // pull prices from https://api.coincap.io/v2/assets/ethereum
      const response = await fetch('https://api.coincap.io/v2/assets/ethereum');
      const json = await response.json();
      this.priceUsd = json.data.priceUsd;
    },
    // Issue the transactoin on chain if everything checks out.
    async sendTransaction() {
      if (this.amount <= 0) {
        this.error = 'Please enter > 0 ETH.';
        return false;
      }
      this.error = false;
      const amountToSend = window.web3.eth.utils.toWei(this.amount, 'ether');
      window.web3.eth.sendTransaction({
        from: this.$store.state.activeAccount,
        to: this.address,
        value: amountToSend,
      }).once('transactionHash', (tx) => {
        this.sendMessage(
          {
            amount: this.amount,
            to: this.address,
            from: this.$store.state.activeAccount,
            tx,
          },
          'payment',
        );
        this.amount = null;
        this.toggle();
      });
      return true;
    },
  },
  async mounted() {
    const dwellerCachingHelper = new DwellerCachingHelper(config.registryAddress);
    const dweller = await dwellerCachingHelper.getDweller(this.address);
    this.name = dweller.name;
    this.icon = dweller.photo;
    this.getMarketPrice();
  },
  /* eslint-disable */
  directives: {
    'click-outside': {
      bind: (el, binding) => {
        let clickedOffOnce = false;
        // Define ourClickEventHandler
        const ourClickEventHandler = event => {
          if (!el.contains(event.target) && el !== event.target) {
            if (clickedOffOnce) {
              // as we are attaching an click event listern to the document (below)
              // ensure the events target is outside the element or a child of it
              binding.value(event); // before binding it
            }
          }
          clickedOffOnce = true;
        };
        // attached the handler to the element so we can remove it later easily
        el.__vueClickEventHandler__ = ourClickEventHandler;

        // attaching ourClickEventHandler to a listener on the document here
        document.addEventListener("click", ourClickEventHandler);
      },
      unbind: function(el) {
        // Remove Event Listener
        document.removeEventListener("click", el.__vueClickEventHandler__);
      }
    }
  },
  /* eslint-enable */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./MiniPayment.less"></style>
