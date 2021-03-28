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
      v-text="!isVoteActive ? 'Start a new vote' : 'End the vote'"
      @click="processVoteButton"
      block
    >
    </b-button>
    <div class="game-table">
      <p>Currently in the game:</p>
      <div class="players-list">
        <div class="column">
          <PlayerBadge
            ref="players"
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
import EventBus from '@/modules/eventBus';
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
        voteStatistics: (state) => state.voteStatistics.votes,
        isVotingCompleted: (state) => state.isVoteCompleted,
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
    cleanInputPlaceholder() {
      this.flushInputState();
      this.currentVoteTitle = ''
    },
    endVote() {
      this.$store.dispatch('endVote')
        // .then(stats => {
        //   this.$emit('voteCompleted', stats);
        // })
      this.cleanInputPlaceholder();
    },
    startVote() {
      if (this.currentVoteTitle) {
        this.inputState = true
        this.$store.dispatch('startNewVote', this.currentVoteTitle)
      }
      else {
        this.inputState = false;
      }
    }
  },
  created() {
    EventBus.$on('voteCompleted', () => {
      this.cleanInputPlaceholder();
    })
  }
}
</script>

<style
  lang='scss'
  scoped
>
.game-field {
  border: 0 solid #000;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  background-color: #E8EEF9;
  box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.4);
}

.input-name {
  margin: 5px 0;
}

.game-table {
  border: 1px solid #000;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #E8EEF9;
  margin-top: 10px;
  height: 80%;
  /* flex: 1; */
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  padding: 20px 30px;

  p {
    font-size: 20px;
    font-weight: 600;
  }
}

.players-list {
  min-height: -webkit-min-content;
  display: flex;
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