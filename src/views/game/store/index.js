import Vue from 'vue'
import Vuex from 'vuex'

// import { socket } from '@/modules/socketModule';
import { xhr } from '@/modules/xhr';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playersList: ['zxczxc', 'zxcxzczxc', 'ddfdgdfg', 'zxczxc', 'zxcxzczxc', 'ddfdgdfg','zxczxc', 'zxcxzczxc', 'ddfdgdfg','zxczxc', 'zxcxzczxc', 'ddfdgdfg','zxczxc', 'zxcxzczxc', 'ddfdgdfg', 'zxczxc', 'zxcxzczxc', 'ddfdgdfg',],
    playerName: '',
    isVoteActive: false,
    voteStatistics: {
      average: 0,
      votes: {}
    },
    isVoteSet: false,
    sessionId: '3f8ec9aa798'
  },
  mutations: {
    setPlayersList: (state, payload) => {
      state.playersList = payload;
    },
    setVotes: (state, payload) => {
      state.voteStatistics.votes = payload;
    },
    setVoteActive: (state, payload) => {
      state.isVoteActive = payload;
    },
    setVoteStats: (state, payload) => {
      state.voteStatistics = payload;
    },
    setVoteSet: (state, payload) => {
      state.isVoteSet = payload;
    },
    setPlayerName: (state, name) => {
      state.playerName = name;
    },

  },
  actions: {
    getAllPlayers({ commit, state }) {
      xhr.get(`/${state.sessionId}/users`)
        .then(({ data }) => {
          commit('setPlayersList', data.all_members);
        })
    },
    getAllVotes({ commit, state }) {
      xhr.get(`${state.sessionId}/current_votes`)
        .then(({ data }) => {
          commit('setVotes', data);
        })
    },
    endVote({ commit, state }) {
      xhr.get(`${state.sessionId}/end_vote`)
        .then(({ data }) => {
          commit('setVoteActive', false);
          commit('setVoteStats', data.statistics);
        })
    },
    sendVote({ commit, state }, payload) {
      xhr.post(`${state.sessionId}/vote`, {
        user_name: state.playerName,
        vote_value: payload
      })
        .then(response => {
          console.log('send vote resp', response);
          commit('setVoteSet');
        })
    }
  },
  modules: {
  }
})
