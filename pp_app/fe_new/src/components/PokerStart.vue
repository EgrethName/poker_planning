<template>
  <div class="start-content">
    Content
    <create-game />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';
import CreateGame from '@/components/CreateGame.vue';

export default defineComponent({
  name: 'PokerStart',

  components: {
    CreateGame,
  },
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
