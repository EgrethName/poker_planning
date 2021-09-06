<template>
  <div class='game-container' id='game-box'>
    <div class='row game-header'>
      <h2>{{ roomName }}</h2>
    </div>
    <div class='game-main-box'>
      <div></div>
      <div class='card-box'>
        <div class='name-header'>
          <h3> You are logged as: {{ playerName }}</h3>
        </div>
<!--        <b-overlay-->
<!--          id='overlay-background'-->
<!--          :show='!isVoteActive'-->
<!--          rounded='sm'-->
<!--          opacity='1'-->
<!--        >-->
          <div class='card-holder'>
            <Card
              :ref='setCardRefs'
              v-for='card in cardSet'
              v-bind:key='card'
              :value='card'
              @voted='processVote'
            />
          </div>
<!--          <template #overlay>-->
<!--            <div class='text-center'>-->
<!--              <b-icon icon='stopwatch' font-scale='3' animation='fade'></b-icon>-->
<!--              <p id='cancel-label'>Please, start a new vote</p>-->
<!--            </div>-->
<!--          </template>-->
<!--        </b-overlay>-->
        <div class='invitation-link'>
<!--          <InvitationPanel-->
<!--            :link='gameLink'-->
<!--          />-->
        </div>
      </div>
      <div class='game-table-container'>
        <GameTable
          @voteCompleted='showStatsModalFromData'
        />
      </div>
    </div>
    <div class='row completed-votes'>
      <div class='col-lg-4'></div>
      <div class='col-lg-4 col-sm-12'>
        <p>Completed votes</p>
        <div class='holder'>
          <CompletedVoteBadge
            ref='completedVotes'
            v-for='item in completedVotes'
            v-bind:key='item.id'
            :stats='item'
            @clicked='showStatsModal'
          />
        </div>
      </div>
      <div class='col-lg-4'></div>
    </div>
    <InputNameModal
      v-model='submitNameSuccess'
      @clicked='enterTheGame'
      ref='modalComponent'
    />
    <CompletedVoteModal
      ref='statsModal'
      :stats='currentStats'
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { mapState } from 'vuex';
import { xhr } from '@/modules/xhr';
import socket from '@/modules/socketModule';
import EventBus from '@/modules/eventBus';

import Card from '@/components/Game/Card.vue';
import GameTable from '@/components/Game/GameTable.vue';
import InputNameModal from '@/components/Game/InputNameModal.vue';
import CompletedVoteModal from '@/components/Game/CompletedVoteModal.vue';
import CompletedVoteBadge from '@/components/Game/CompletedVoteBadge.vue';
// import InvitationPanel from '@/components/Game/InvitationPanel.vue';

export default defineComponent({
  name: 'GameView',
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
      currentStats: {
        id: '',
        title: '',
        votes: {},
        average: 0,
      },
      cardRefs: [],
    };
  },
  props: {
  },
  components: {
    Card,
    GameTable,
    InputNameModal,
    CompletedVoteModal,
    CompletedVoteBadge,
    // InvitationPanel,
  },
  computed: {
    cardSet() {
      return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '∞', '?'];
    },
    ...mapState({
      playerName: (state) => state.playerName,
      sessionId: (state) => state.sessionId,
      roomName: (state) => state.roomName,
      completedVotes: (state) => state.completedVotes,
      wsSessionId: (state) => state.wsSessionId,
      isVoteActive: (state) => state.isVoteActive,
      lastVoteResults: (state) => state.voteStatistics,
      gameLink: (state) => state.gameLink,
    }),
  },
  methods: {
    enterTheGame(name) {
      xhr.post(`/${this.sessionId}/join_game`, {
        user_name: name,
        ws_sid: this.wsSessionId,
      })
        .then(() => {
          this.submitNameSuccess = true;
          localStorage.name = name;
          this.$store.commit('setPlayerName', name);
          this.$store.dispatch('getAllPlayers');
        })
        .catch(() => {
          this.showAlert();
          this.submitNameSuccess = false;
        });
    },
    processVote(vote) {
      this.$store.dispatch('sendVote', vote);
      console.log(this.$refs);
      /* eslint-disable-next-line */
      for (const card of this.cardRefs) {
        card.isSelected = card.value === vote;
      }
    },
    clearCardVotes() {
      /* eslint-disable-next-line */
      for (const card of this.cardRefs) {
        card.isSelected = false;
      }
    },
    showStatsModalFromData(stats) {
      this.currentStats = cloneDeep(stats);
      this.$refs.statsModal.show();
    },
    showStatsModal(id) {
      let requestedStats = {};
      /* eslint-disable-next-line */
      for (const stats of this.completedVotes) {
        if (stats.id === id) {
          requestedStats = cloneDeep(stats);
          break;
        }
      }
      this.currentStats = requestedStats;
      this.$refs.statsModal.show();
    },
    hideStatsModal() {
      this.$refs.statsModal.hide();
    },
    scrollToEnd() {
      const container = document.getElementById('game-box');
      container.scrollTop = container.scrollHeight - container.clientHeight;
    },
    setCardRefs(el) {
      if (el) {
        this.cardRefs.push(el);
      }
    },
  },
  mounted() {
    socket.on('connect', () => {
      this.$store.commit('setWSSessionId', socket.id);

      if (localStorage.name) {
        this.$store.commit('setPlayerName', localStorage.name);
        this.enterTheGame(localStorage.name);
      } else {
        this.$refs.modalComponent.show();
      }
    });
    // this.$root.$on('shown', (collapseId, isJustShown) => {
    //   if (isJustShown) {
    //     this.scrollToEnd();
    //   }
    // });
  },
  watch: {
    isVoteActive(val) {
      if (!val) {
        this.clearCardVotes();
      }
    },
    completedVotes: {
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('activate');
    this.$store.dispatch('getSessionInfo');
    EventBus.on('voteStatsAvailable', (msg) => {
      this.showStatsModalFromData(msg);
    });
    EventBus.on('newVoteStarted', () => {
      this.hideStatsModal();
    });
  },
  beforeUpdate() {
    this.cardRefs = [];
  },
  updated() {
    console.log(this.cardRefs);
  },
});
</script>

<style
  lang='scss'
  scoped
>

.game-container {
  height: 100%;
  background: #ffffff;
  /* overflow: auto; */
}

.game-main-box {
  display: grid;
  //grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 3fr 5fr;
  grid-gap: 2vw;
}

@media (max-width: 850px) {
  .game-main-box {
    grid-template-columns: 1fr;
    grid-gap: 2vw;
  }

  .game-table-container {
    height: unset !important;
  }
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
  padding-top: 1em;
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
  max-width: 300px;
  margin: auto;
}

.game-table-container {
  //height: 98%;
  margin: auto;
  height: 600px;
}

.completed-votes {
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: auto;
  padding-bottom: 5px;

  p {
    font-size: 20px;
    font-weight: 600;
  }

  .holder {
    display: flex;
    flex-direction: column;
  }
}

#cancel-label {
  font-size: 20px;
}

</style>
