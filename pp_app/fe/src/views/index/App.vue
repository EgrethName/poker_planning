<template>
  <div id="app">
    <Header
      tooltipText="Coming soon... Just create a game!"
    />
    <div class="wrapper container">
      <div class="index-container">
        <b-jumbotron
          header="Poker Planning"
          lead="A simple app for agile poker planning"
          class="poker-jumbo"
          >
          <p>Create a game to start planning!</p>
            <PokerHello />
        </b-jumbotron>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import PokerHello from "@/components/PokerHello.vue";
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: "App",
  data() {
    return {
      name: ''
    }
  },
  components: {
    PokerHello,
    Header,
    Footer
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(var(--vh, 1vh)*100);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #BDD0F7;
    }
  }
}

.poker-jumbo {
  background-color: #BDD0F7 !important;
  border-radius: 1rem;

  h1 {
    font-weight: 500;
  }
}

.index-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
