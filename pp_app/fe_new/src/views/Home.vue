<template>
  <div>
    <Header />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Header,
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
