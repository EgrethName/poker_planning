<template>
  <div class="start-content">
    Content
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'PokerStart',

  computed: {
    ...mapState({
      gameId: (state): string => (state as State).sessionId,
    }),
  },
});

</script>

<style scoped>

.start-content {
  height: 100%;
  padding: 0 24px;
  background: #ffffff;
}
</style>
