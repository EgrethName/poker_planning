<template>
  <div>
    <game-view />
  </div>
</template>

<script lang="ts">
import GameView from '@/components/Game/GameView'
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';


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
