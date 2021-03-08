<template>
  <div id="app">
    <div class=""></div>
    <div class="wrapper container">
      <header></header>
      <nav></nav>
      <div class="heading"></div>
        <PokerHello />
      <div class="row">
        <aside class="col-md-7">
        </aside>
        <section class="col-md-17"></section>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import PokerHello from "@/components/PokerHello.vue";

export default {
  name: "App",
  components: {
    PokerHello,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
