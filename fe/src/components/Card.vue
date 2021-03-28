<template>
  <div>
    <button
      v-bind:class="classList"
      @click="setVote"
    >
      <h3>{{ value }}</h3>
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      basicClass: 'card-item',
      selectedClass: 'card-item__selected',
      isSelected: this.selected,
    }
  },
  computed: {
    classList() {
      return [this.isSelected ? this.selectedClass : '', this.basicClass]
    }
  },
  props: {
    value: String,
    selected: Boolean
  },
  methods: {
    setVote() {
      this.$emit('voted', this.value);
    }
  }
}
</script>

<style
  lang='scss'
  scoped
>
$black: #282828;
$point: rgb(201, 255, 180);
$point-light: lighten($point, 5%);

$ratio: 1.918;
$card_width: 50px;
$card_height: $card_width * $ratio;
$card_padding: 20px 7px;
$card-bgcolor: rgb(235, 235, 235);
$card_margin: 5px;
$card_round: 10px;
$card-shadow: -2px -2px 5px 0px $point-light;

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
    background-color: rgb(180, 255, 151);
  }

  &__selected {
    background-color: rgb(130, 255, 80);
  }
}
</style>