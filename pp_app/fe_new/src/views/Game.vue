<template>
  <div>
    <game-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';
import GameView from '@/components/Game/GameView.vue';

export default defineComponent({
  name: 'Game',

  components: {
    GameView,
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
