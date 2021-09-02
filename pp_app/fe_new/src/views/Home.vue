<template>
  <div class="container" style="min-height: calc(var(--vh, 1vh)*100);">
    <div class="row header">
      <Header />
    </div>
    <div class="row content">
      <poker-start />
    </div>
    <div class="row footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PokerStart from '@/components/PokerStart.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Header,
    Footer,
    PokerStart,
  },

  computed: {
    ...mapState({
      gameId: (state): string => (state as State).sessionId,
    }),
  },
});

</script>

<style scoped>

</style>
