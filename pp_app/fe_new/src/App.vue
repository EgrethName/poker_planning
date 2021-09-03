<template>
  <div class="wrapper container">
    <div class="row header">
      <Header />
    </div>
    <div class="row content">
      <router-view/>
    </div>
    <div class="row footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Global/Header.vue';
import Footer from '@/components/Global/Footer.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
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
