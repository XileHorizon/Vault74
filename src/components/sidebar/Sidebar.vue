<template>
  <section class="section main-section">
    <Servers />
    <h1 id="logo">Vault74</h1>
    <div class="control user-search">
        <input class="input is-small" type="text" placeholder="Find a vault dweller...">
    </div>
    <div class="tabs">
        <ul>
            <li class="is-active"><a>People</a></li>
            <li><a>Groups</a></li>
            <li><a>Files</a></li>
        </ul>
    </div>
    <div class="usercontainer">
        <User name="Samantha Version" status="Idly typing away!" online="true" icon="https://randomuser.me/api/portraits/women/56.jpg"/>
        <User name="Sophie Chain" status="Enjoying Vault74's piece of mind" online="true" icon="https://randomuser.me/api/portraits/women/43.jpg" active="true"/>
        <User name="Clark Kent" status="Guys, I'm not superman" online="false" icon="https://randomuser.me/api/portraits/men/56.jpg"/>
        <User name="James Fault" status="I'm so excited for vacation" online="false" icon="https://randomuser.me/api/portraits/men/26.jpg"/>
        <User name="Jessica Addy" status="Exploring Cyberpunk 2077" online="true" icon="https://randomuser.me/api/portraits/women/26.jpg"/>
        <User name="Scarlett Joblockchain" status="The moon is lame, I'm going to mars" online="true" icon="https://randomuser.me/api/portraits/women/27.jpg"/>
        <User name="Frank Semver" status="You're awesome." online="false" icon="https://randomuser.me/api/portraits/men/22.jpg"/>
        <User name="Wally Whale" status="Candlesticks work for me" online="true" icon="https://randomuser.me/api/portraits/men/8.jpg"/>
        <User name="James Man" status="10010101001100" online="false" icon="https://randomuser.me/api/portraits/men/20.jpg"/>
    </div>
    <Controls :toggleSettings="toggleSettings"/>
  </section>
</template>

<script>
import Servers from '@/components/servers/Servers';
import User from '@/components/sidebar/user/User';
import Controls from '@/components/sidebar/controls/Controls';

export default {
  name: 'Sidebar',
  props: ['toggleSettings'],
  components: {
    Servers,
    User,
    Controls,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #logo {
        font-family: 'Major Mono Display', monospace;
        font-size: 25pt;
        padding-top: 1rem;
        padding-bottom: 2rem;
    }
    .usercontainer {
        position: absolute;
        bottom: 3.5rem;
        right: 1.5rem;
        left: 1.5rem;
        top: 12rem;
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    -webkit-scrollbar {
        display: none;
    }
    .main-section {
        padding-top: 0;
        height: calc(100% - 2rem);
        position: relative;
    }
    .tabs li {
        margin-right: 1rem;
        font-size: 10pt;
    }
    .tabs {
        margin-bottom: 1rem;
    }
    .tabs li a{
        padding: 0.5rem 0.4rem;
        font-weight: bold;
        color: #666;
    }
    .tabs li.is-active a {
        color: #00d0a1;
        border-bottom: 2px solid;
        font-weight: bold;
    }
    .user-search {
        padding-bottom: 1rem;
    }
    .user-search input:focus, .user-search input:focus{
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid #00d0a1;
    }
</style>
