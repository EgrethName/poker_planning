<template>
  <div class="game-container container" id="game-box">
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
        <b-overlay
          id="overlay-background"
          :show="!isVoteActive"
          rounded="sm"
          opacity="1"
        >
          <div class="card-holder">
            <Card
              ref="cards"
              v-for="card in cardSet"
              v-bind:key="card"
              :value="card"
              @voted="processVote"
            />
          </div>
          <template #overlay>
            <div class="text-center">
              <b-icon icon="stopwatch" font-scale="3" animation="fade"></b-icon>
              <p id="cancel-label">Please, start a new vote</p>
            </div>
          </template>
        </b-overlay>
        <div class="invitation-link">
          <InvitationPanel
            :link="gameLink"
          />
        </div>
      </div>
      <div class="col-lg-6 game-table-container">
        <GameTable
          @voteCompleted="showStatsModalFromData"
        />
      </div>
      <InputNameModal
        v-model="submitNameSuccess"
        @clicked="enterTheGame"
        ref="modalComponent"
      />
      <CompletedVoteModal
        ref="statsModal"
        :stats="currentStats"
      />
    </div>
    <div class="row completed-votes">
        <div class="col-lg-4"></div>
        <div class="col-lg-4 col-sm-12">
          <p>Completed votes</p>
          <b-collapse visible id="collapse-2">
            <div class="holder">
              <CompletedVoteBadge
                ref="completedVotes"
                v-for="item in completedVotes"
                v-bind:key="item.id"
                :stats="item"
                @clicked="showStatsModal"
              />
            </div>
          </b-collapse>
        </div>
        <div class="col-lg-4"></div>
      </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import EventBus from '@/modules/eventBus';
import { mapState } from 'vuex';
import { xhr } from '@/modules/xhr';
import socket from '@/modules/socketModule';

import Card from "@/components/Card";
import GameTable from "@/components/GameTable";
import InputNameModal from "@/components/InputNameModal";
import CompletedVoteModal from "@/components/CompletedVoteModal";
import CompletedVoteBadge from "@/components/CompletedVoteBadge";
import InvitationPanel from '@/components/InvitationPanel.vue';


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
      currentStats: {
        id: '',
        title: '',
        votes: {},
        average: 0
      }
    }
  },
  props: {
  },
  components: {
    Card,
    GameTable,
    InputNameModal,
    CompletedVoteModal,
    CompletedVoteBadge,
    InvitationPanel,
  },
  computed: {
      cardSet() {
        return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '∞', '?']
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
          ws_sid: this.wsSessionId
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
        })
    },
    processVote(vote) {
      this.$store.dispatch('sendVote', vote);
      for (let card of this.$refs.cards) {
        if (card.value === vote) {
          card.isSelected = true;
        }
        else {
          card.isSelected = false;
        }
      }
    },
    clearCardVotes() {
      for (let card of this.$refs.cards) {
        card.isSelected = false;
      }
    },
    showStatsModalFromData(stats) {
      console.log('last res', stats);
      this.currentStats = cloneDeep(stats);
      this.$refs.statsModal.show()
    },
    showStatsModal(id) {
      let requestedStats = {};
      for (let stats of this.completedVotes) {
        if (stats.id === id) {
          requestedStats = cloneDeep(stats);
          break;
        }
      }
      this.currentStats = requestedStats;
      this.$refs.statsModal.show()
    },
    scrollToEnd() {
      var container = document.getElementById("game-box");
      console.log(container.scrollTop, container.scrollHeight);
      container.scrollTop = container.scrollHeight - container.clientHeight;
      console.log(container.scrollTop, container.scrollHeight);
    },
  },
  mounted() {
    console.log(this.completedVotes);
    socket.on('connect', () => {
      console.log('connected');
      this.$store.commit('setWSSessionId', socket.id);
      console.log(this.wsSessionId);

      if (localStorage.name) {
        this.$store.commit('setPlayerName', localStorage.name);
        this.enterTheGame(localStorage.name);
      } else {
        this.$refs.modalComponent.show();
      }
    });
    this.$root.$on('shown', (collapseId, isJustShown) => {
      console.log('collapseId:', collapseId)
      console.log('isJustShown:', isJustShown)

      if (isJustShown) {
        this.scrollToEnd();
      }
    })
  },
  watch: {
    isVoteActive(val) {
      if (!val) {
        this.clearCardVotes();
      }
    },
    completedVotes: {
      deep: true,
      handler(val) {
        console.log('The list of completed votes has changed!', val);
      }
    }
  },
  created() {
    console.log('created');
    this.$store.dispatch('activate');
    this.$store.dispatch('getSessionInfo');
    EventBus.$on('voteStatsAvailable', msg => {
      this.showStatsModalFromData(msg);
    })
  }
}
</script>

<style
  lang='scss'
  scoped
>

.game-container {
  height: 100%;
  /* overflow: auto; */
}

.game-main {
  height: 75%;
  overflow: auto;
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
}

.game-table-container {
  height: 98%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.completed-votes {
  margin-top: 5px;
  margin-bottom: 5px;
  overflow: auto;
  padding-bottom: 50px;

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