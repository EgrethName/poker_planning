<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <button @click="$router.push('/')"></button>
      <button style="margin-left: 20px" @click="$router.push(`/game/${gameId}`)">Game
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'NavBar',

  computed: {
    ...mapState({
      gameId: (state): string => (state as State).sessionId,
    }),
  },
});
</script>

<style scoped>

</style>
