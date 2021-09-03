<template>
  <div
    class="navbar"
  >
    <div class="navbar__btns">
      <a-button class="btn" @click="$router.push('/')">Main page</a-button>
      <a-button class="btn" @click="$router.push(`/game/${gameId}`)">
        Game
      </a-button>
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
.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: 10px;
}

</style>
