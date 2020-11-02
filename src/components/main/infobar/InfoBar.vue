<template>
  <section class="infobar">
    <DwellerID :active="idActive" :toggle="toggleFingerprint" />
    <div class="columns">
        <div class="column is-three-fifths">
            <div class="profile">
                <i class="fa fa-comments"></i>
            </div>
            <div class="profile-details">
                <p>Sophie&nbsp;Chain&nbsp;<span class="address">0x0000000000000000000000...</span></p>
            </div>
        </div>
        <div class="column is-two-fifths">
            <div class="profile-actions">
                <i class="fa fa-phone-volume"></i>
                <i class="fa fa-video"></i>
                <input class="input is-small searchuser" type="text" placeholder="Search in convorsation...">
                <i class="fas fa-address-card" v-on:click="toggleFingerprint"></i>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import DwellerID from '@/components/main/dwellerid/DwellerID';

export default {
  name: 'InfoBar',
  components: {
    DwellerID,
  },
  data() {
    return {
      idActive: false,
    };
  },
  methods: {
    toggleFingerprint() {
      this.idActive = !this.idActive;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .is-two-fifths {
      padding-right: 3rem;
    }
    .profile-actions i {
        float: left;
        height: 100%;
        padding: 0.75rem 0.5rem;
        cursor: pointer;
    }
    .profile-actions {
        position: relative;
        padding-right: 1rem;
        margin-right: 5.7rem;
    }
    .control {
        width: 160px;
        margin-top: 0.45rem;
        float: left;
    }
    .searchuser {
        position: absolute;
        right: 1rem;
        left: 5rem;
        top: 0.5rem;
        margin-right: 1rem;
    }
    .fa-address-card {
      position: absolute;
      right: -7.6rem;
    }
    .infobar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 3rem;
        background: #fff;
        border-bottom: 1px solid #e7ebee;
        font-weight: bold;
        font-size: 15pt;
    }
    .profile {
        float: left;
        height: 100%;
        width: 50px;
        padding: 0.25rem;
    }
    .fa-comments {
        font-size: 18pt;
        padding: 0.4rem 0.5rem;
        color: #e7ebee;
    }
    .circle-icon {
        width: 36px;
        height: 36px;
    }
    .profile-details {
        padding-top: 0.45rem;
        height: 100%;
        float: left;
        word-wrap: none;
    }
    .address {
        font-size: 9pt;
        color: #ccc;
    }
</style>
