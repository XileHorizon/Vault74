<template>
    <span>
      <span class="has-tooltip-arrow"
        data-tooltip="Developer">
        <i 
          v-if="isRank('developers')"
          class="fas fa-hat-wizard"></i>
      </span>
      <span class="has-tooltip-arrow"
        data-tooltip="Supporter">
        <i 
          v-if="isRank('supporters')"
          class="fas fa-heart"></i>
      </span>
      <span class="has-tooltip-arrow" data-tooltip="Tester">
        <i
          v-if="isRank('testers')"
          class="fas fa-flask"></i>
      </span>
    </span>
</template>

<script>
export default {
  name: 'Badges',
  props: ['address'],
  methods: {
    isRank(rank) {
      return this[rank].includes(this.address);
    },
  },
  data() {
    return {
      developers: [
        '0xD02248C262b3690CC6eE73D24F5f2F19095585Fb',
      ],
      supporters: [
        '0x61E0E9ADe660551cd78B584Fb54d492CaEAAaD55',
        '0xA0eAf1961243E3708bAe85927D2645D8f8e8cC67',
      ],
      testers: [
        '0x31BaEc09bb1628A17A9A99dABA11e9Ca75493Fd1',
        '0x61E0E9ADe660551cd78B584Fb54d492CaEAAaD55',
        '0x8AE982dFE0A0B725A4e385d8FA22BaDd69Eb3e1F',
        '0x738cD984d5B49e2e6CF11660fa2Ee568FAad6a0b',
        '0xA0eAf1961243E3708bAe85927D2645D8f8e8cC67',
        '0x7Ec83F5A35848E5337380253f03dfCca6Fba7B73',
        '0x834C14352a8Ee4f8005aBD3d6d4359B47dDf7767',
        '0x200D44F3661688ded837132556cF51b4F94dB7a6',
        '0xd4942c9844F53b864206144dFFf97541091DB15B',
        '0x68BB61130Abc842c0191523299e4Dd1Bbe21784b',
        '0x4116b121B9908a264163A95493D61Ea5b6114bFa',
        '0x3dbe98400eD635943D06569414775d05F9ED205f',
        '0x24da33427bD1076BBb956A2e804a76e5D9611344',
        '0x703f98Ca66BfB4Dbc9922A9001F88c6AC7AD1cF9',
        '0x5398Ee2D0964f210Dc0902c1CcB9e0BeD667A9a7',
        '0xBD4c98E51872172E5dE259E48B1f74a115AbF45B',
        '0xD4cA48706CAf708cB6BA463Ae8e8B030140fa01b',
        '0x43E2b23C1199a29bF2781DeAdA0aAc608419B430',
      ],
      contributors: [
        '0x1aDe7295759574ecC7887A9B76844939B38eE315',
        '0x7Ec83F5A35848E5337380253f03dfCca6Fba7B73',
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    span[data-tooltip] {
      border-bottom: none;
    }
    .fas {
      font-size: 8pt;
    }
    .fa-heart {
      color: #ff7675 !important; 
    }
    .fa-hat-wizard {
      color: #a29bfe !important;
    }
    .fa-flask {
      color: #00cec9 !important;
    }
</style>
