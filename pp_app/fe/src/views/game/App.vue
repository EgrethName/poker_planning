<template>
  <div id="app" class="main-box">
    <div class="main-box__header">
      <Header
        tooltipText="Coming soon..."
      />
    </div>
    <div class="wrapper container main-box__content">
      <Game />
    </div>
    <div class="main-box__footer">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Game from '@/components/Game.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: '',
  components: {
    Header,
    Game,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  height: calc(var(--vh, 1vh)*100);
  overflow: hidden;
}

.main-box {
  display: flex;
  flex-direction: column;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
