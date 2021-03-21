<template>
  <div class="fix-height game-field">
    <b-form-input
      :state="inputState"
      type="text"
      v-model="currentVoteTitle"
      placeholder="Type current story title"
      :disabled="isVoteActive"
      :v-on:keyup="flushInputState"
      class="input-name"
    />
    <b-button
      :variant="!isVoteActive ? 'primary' : 'success'"
      v-text="!isVoteActive ? 'Start a new story' : 'End the vote'"
      @click="processVoteButton"
      block
    >
    </b-button>
    <div class="game-table">
      <p>Currently in the game:</p>
      <div class="players-list">
        <div class="column">
          <PlayerBadge
            v-for="player in playersList"
            v-bind:key="player"
            :name="player"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PlayerBadge from '@/components/PlayerBadge.vue'

export default {
  data() {
    return {
      inputState: null
    }
  },
  components: {
    PlayerBadge
  },
  computed: {
    ...mapState({
        playersList: (state) => state.playersList,
        isVoteActive: (state) => state.isVoteActive,
      }),
      currentVoteTitle: {
        get () {
          return this.$store.state.activeVoteTitle
        },
        set (value) {
          this.$store.commit('setActiveVoteTitle', value)
        }
      },
    },
  methods: {
    processVoteButton() {
      if (this.isVoteActive) {
        return this.endVote()
      }
      this.startVote();
    },
    flushInputState() {
      this.inputState = null
    },
    endVote() {
      this.$store.dispatch('endVote')
      // this.isVoteActive = false
      this.inputState = null
      this.currentVoteTitle = ''
    },
    startVote() {
      if (this.currentVoteTitle) {
        this.inputState = true
        this.$store.dispatch('startNewVote', this.currentVoteTitle)
        // this.isVoteActive = true
      }
      else {
        this.inputState = false;
      }
    }
  }
}
</script>

<style
  lang='scss'
  scoped
>
.game-field {
  border: 2px solid #000;
  border-radius: 0;
  box-sizing: border-box;
  padding: 15px;
}

.input-name {
  margin: 5px 0;
}

.game-table {
  border: 2px solid #000;
  border-radius: 0;
  box-sizing: border-box;
  margin-top: 10px;
  height: 80%;
  flex: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
  padding: 20px 30px;
}

.players-list {
  min-height: -webkit-min-content;
  display: flex;

  .hh {
    height: 2000px;
    background: red;
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>