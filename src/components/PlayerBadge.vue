<template>
  <div >
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
      v-if="isVoteDone"
    >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicClass: 'player',
      isVoted: false,
      isVotingStarted: false,
      isVoteDone: false,
      mark: null
    }
  },
  props: {
    name: String
  },
  computed: {
    stateClass() {
      return this.isVoted ? 'player__voted' : '';
    },
    isPending() {
      return !this.isVoted && this.isVotingStarted;
    },
    markValue() {
      return this.isVoted && !this.isVotingStarted ? this.mark : '?'
    }
  }
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

.mark-holder{
  background-color: whitesmoke;
  float: right;
  margin: 2px 4px;
  border: $field-border;
  padding: 0.2em 0;
  width: 3rem;
  font-weight: 800;
}

.player {
  -webkit-appearance: button;
  background-color: rgb(245, 184, 184);
  border: 2px solid #000;
  border-radius: 0;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  float: left;
  font-weight: 700;
  letter-spacing: .05em;
  margin: 2px 0px;
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
    background-color: rgb(140, 235, 131);
  }

}


</style>