<template>
  <div class="player-badge">
    <div 
      v-bind:class="[basicClass, stateClass]"
    >
      {{ name }}
      <b-icon 
        icon="arrow-clockwise" 
        animation="spin" 
        font-scale="1"
        class="icon-player"
        v-if="isPending"
      ></b-icon>
    </div>
    <div 
      class="mark-holder"
      v-text="markValue"
      v-if="isVotingCompleted"
    >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      basicClass: 'player',
    }
  },
  props: {
    name: String,
  },
  computed: {
    ...mapState({
      voteStatistics: (state) => state.voteStatistics.votes,
      isVotingStarted: (state) => state.isVoteActive,
      isVotingCompleted: (state) => state.isVoteCompleted,
    }),
    isVoted() {
      console.log(this.name, this.voteStatistics);
      return this.name in this.voteStatistics;
    },
    mark() {
      return this.voteStatistics[this.name];
    },
    stateClass() {
      return this.isVoted ? 'player__voted' : '';
    },
    isPending() {
      return !this.isVoted && this.isVotingStarted;
    },
    markValue() {
      return this.isVoted && !this.isVotingStarted ? this.mark : '?'
    }
  },

}
</script>

<style
  lang='scss'
  scoped
>

$field-border: 2px solid #000;
$field-border-radius: 0;
$field-box-sizing: border-box;
$field-padding: 0.2em 2em;

.icon-player {
  float: right;
  margin-top: 4px;
}

.player-badge {
  display: flex;
}

.mark-holder{
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 2px 4px;
  border: $field-border;
  padding: 0.2em 0;
  width: 3rem;
  font-weight: 800;
  font-size: 17px;
}

.player {
  -webkit-appearance: button;
  background-color: rgb(255, 219, 219);
  border: 2px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  float: left;
  font-weight: 700;
  letter-spacing: .05em;
  margin: 3px;
  outline: none;
  overflow: visible;
  padding: $field-padding;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  transition: all .3s ease-in-out;
  user-select: none;
  width: 16.8125rem;

  &__vote-pending {
    background-color: rgb(245, 184, 184);
  }

  &__voted {
    background-color: rgb(173, 255, 166);
  }
}

@media screen and (max-width: 500px) {
  .player-badge {
    max-width: 60%;
  }
}

</style>