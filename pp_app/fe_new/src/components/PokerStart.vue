<template>
  <div class="start-content">
    <div class="jumbotron">
      <div class="jumbotron-header">
        <h1>Poker Planning</h1>
      </div>
      <div class="jumbotron-body">
        <h3>A simple app for agile poker planning</h3>
      </div>
      <div>
        <h4>Create a game to start planning!</h4>
      </div>
      <create-game />
    </div>
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

<style
  scoped
  lang="scss"
>

.start-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 24px;
  background: #ffffff;
}

.jumbotron {
  display: flex;
  flex-direction: column;
  //border: 1px dotted black;
  margin: 20px;
  background-color: #BDD0F7 !important;
  border-radius: 10px;
  padding: 4rem 2rem;

  h1 {
    font-weight: 500;
    font-size: 4.5rem;
  }

  h3 {
    font-weight: 400;
    font-size: 1.5rem;
  }

  h4 {
    font-weight: 300;
    font-size: 1.25rem;
  }

  &-body {
    margin-bottom: 0.2rem;
  }

}

</style>
