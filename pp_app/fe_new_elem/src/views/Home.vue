<template>
  <poker-start />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';
import PokerStart from '@/components/Home/PokerStart.vue';

export default defineComponent({
  name: 'Home',

  components: {
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
