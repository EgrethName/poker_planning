<template>
  <div class="game-container container">
    <div class="row game-header">
      <h2>{{ roomName }}</h2>
    </div>
    <div class="row game-main">
      <div class="col-lg-2">
      </div>
      <div class="col-lg-4 card-box">
        <div class="name-header">
          <h3> You are logged as: {{ playerName }}</h3>
        </div>
        <div class="card-holder">
          <Card
            v-for="card in cardSet"
            v-bind:key="card"
            :value="card"
          />
        </div>
      </div>
      <div class="col-lg-6 fix-height">
        <GameTable />
      </div>
      <InputNameModal
        v-model="submitNameSuccess"
        @clicked="enterTheGame"
        ref="modalComponent"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { xhr } from '@/modules/xhr';

import Card from "@/components/Card";
import GameTable from "@/components/GameTable";
import InputNameModal from "@/components/InputNameModal";


export default {
  data() {
    return {
      name: '',
      players: [],
      flags: {
        isVoteDone: false,
        isVoteStarted: false,
      },
      cards: null,
      passwordState: null,
      submitNameSuccess: false,
    }
  },
  props: {
  },
  components: {
    Card,
    GameTable,
    InputNameModal
  },
  computed: {
      cardSet() {
        return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', 'inf', '?']
      },
      ...mapState({
        playerName: (state) => state.playerName,
        sessionId: (state) => state.sessionId,
        roomName: (state) => state.roomName,
      }),
  },
  methods: {
    async enterTheGame(name) {
      await xhr.post(`/${this.sessionId}/join_game`, {
          user_name: name,
        })
        .then(response => {
          console.log(response.data);
          this.submitNameSuccess = true;
          localStorage.name = name;
          this.$store.commit('setPlayerName', name);
          this.$store.dispatch('getAllPlayers');
        })
        .catch(() => {
          this.showAlert();
          this.submitNameSuccess = false;
        })
    },
  },
  mounted() {
    console.log('mounted');
    if (localStorage.name) {
      this.$store.commit('setPlayerName', localStorage.name);
      this.enterTheGame(localStorage.name);
    } else {
      this.$refs.modalComponent.show();
    }
  },
  watch: {
    // name(newName) {
    //   localStorage.name = newName;
    // }
  },
  created() {
    this.$store.dispatch('getSessionInfo');
  }
}
</script>

<style
  lang='scss'
  scoped
>

.game-container {
  height: 100%;
  overflow: auto;
}

.game-main {
  height: 75%;
}

.game-header {
  height: 7em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-header {
  height: 4em;
  padding-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-holder {
  height: 450px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 1;
}

</style>