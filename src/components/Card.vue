<template>
  <div>
    <button
      v-bind:class="[(isSelected && isVoteActive) ? selectedClass : '', basicClass]"
      @click="setVote"
    >
      <h3>{{ value }}</h3>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isSelected: false,
      basicClass: 'card-item',
      selectedClass: 'card-item__selected',
    }
  },
  computed: {
    ...mapState({
      isVoteActive: (state) => state.isVoteActive,
    })
  },
  props: {
    value: String
  },
  methods: {
    setVote() {
      this.$store.dispatch('sendVote', this.value);
      this.isSelected = true;
    }
  },
}
</script>

<style
  lang='scss'
  scoped
>
$black: #282828;
$point: salmon;
$point-light: lighten($point, 5%);

$ratio: 1.918;
$card_width: 50px;
$card_height: $card_width * $ratio;
$card_padding: 20px 7px;
$card-bgcolor: white;
$card_margin: 5px;
$card_round: 10px;
$card-shadow: -4px -4px 0px 0px $point-light;

.card-item {
  margin: 5px;
  text-align: center;
  background-color: $card-bgcolor;
  width: $card_width;
  min-height: $card_height;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  padding: $card_padding;
  margin: $card_margin;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  -webkit-box-shadow: $card-shadow;
          box-shadow: $card-shadow;
  border-radius: $card_round;

  -webkit-animation-name: shadow-show; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */
  animation-name: shadow-show;
  animation-duration: 1.5s;

  -webkit-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
  -o-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
  transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000); /* custom */

  h1,h2,h3,h4,h5{
    margin: 0px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 30px;
    color: $black;
  }

  &:hover {
    background-color: rgb(123, 123, 255);
  }

  &__selected {
    background-color: rgb(72, 72, 165);
  }
}
</style>