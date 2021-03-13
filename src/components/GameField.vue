<template>
  <div class="game-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <Card 
            v-for="card in cardSet"
            v-bind:key="card"
            :value="card"
          />
        </div>
        <div class="col-lg-8">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  data() {
    return {
      roomName: '',
      players: [],
      flags: {
        isVoteDone: false,
        isVoteStarted: false,
      },
      cards: null,
      passwordState: null,
    }
  },
  components: {
    Card
  },
  computed: {
      cardSet() {
        console.log('here');
        return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', 'inf', '?']
      }
  }
}
</script>

<style>

</style>