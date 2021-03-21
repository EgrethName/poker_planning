import Vue from 'vue'
import Vuex from 'vuex'

// import { socket } from '@/modules/socketModule';
import { xhr } from '@/modules/xhr';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playersList: [],
    playerName: '',
    isVoteActive: false,
    isVoteCompleted: false,
    voteStatistics: {
      average: 0,
      votes: {}
    },
    isVoteSet: false,
    sessionId: '70ee9841b84',
    completedVotes: {},
    roomName: '',
    activeVoteTitle: ''
  },
  mutations: {
    setSessionId: (state, id) => {
      state.sessionId = id;
    },
    setPlayersList: (state, payload) => {
      state.playersList = payload;
    },
    setVotes: (state, payload) => {
      state.voteStatistics.votes = Object.assign({}, state.voteStatistics.votes, payload);
    },
    clearVoteStats: (state) => {
      state.voteStatistics.votes = {};
    },
    setVoteActive: (state, payload) => {
      state.isVoteActive = payload;
    },
    setVoteCompleted: (state, payload) => {
      state.isVoteCompleted = payload;
    },
    setVoteStats: (state, stats) => {
      const title = stats.title;
      delete stats.title;
      state.voteStatistics = stats;
      const payload = {
        [title]: {
          'average': stats.average,
          'votes': stats.votes,
        }
      }
      console.log(payload);
      state.completedVotes = Object.assign({}, state.completedVotes, payload);
    },
    setVoteSet: (state, payload) => {
      state.isVoteSet = payload;
    },
    setPlayerName: (state, name) => {
      state.playerName = name;
    },
    setRoomName: (state, name) => {
      state.roomName = name;
    },
    setActiveVoteTitle: (state, title) => {
      state.activeVoteTitle = title;
    },

  },
  actions: {
    getAllPlayers({ commit, state }) {
      xhr.get(`/${state.sessionId}/users`)
        .then(({ data }) => {
          commit('setPlayersList', data.session_users);
        })
    },
    getAllVotes({ commit, state }) {
      xhr.get(`${state.sessionId}/current_votes`)
        .then(({ data }) => {
          commit('setVotes', data);
        })
    },
    endVote({ commit, state }) {
      xhr.post(`${state.sessionId}/end_vote`)
        .then(({ data }) => {
          console.log('end vote', data);
          commit('setVoteActive', false);
          commit('setVoteCompleted', true);
          commit('setVoteStats', data.statistics);
        })
    },
    sendVote({ commit, state, dispatch }, payload) {
      xhr.post(`${state.sessionId}/vote`, {
        user_name: state.playerName,
        vote_value: payload
      })
        .then(response => {
          console.log('send vote resp', response);
          dispatch('getAllVotes');
          commit('setVoteSet');
        })
    },
    startNewVote({ commit, state }, payload) {
      xhr.post(`${state.sessionId}/new_vote`, {
        title: payload
      })
        .then(response => {
          console.log('send start new vote resp', response);
          commit('clearVoteStats', true);
          commit('setVoteActive', true);
          commit('setVoteCompleted', false);
        })
        .catch(() => {
          commit('setVoteActive', false);
          commit('setVoteCompleted', false);
        })
    },
    getSessionInfo({ commit, state, dispatch }) {
      xhr.get(`${state.sessionId}/info`)
        .then(({ data }) => {
          console.log('session info', data);

          commit('setRoomName', data.session_name);
          commit('setSessionId', data.session_id);
          commit('setPlayersList', data.session_users);

          if (data.active_sessions.length){
            commit('setVoteActive', true);
            commit('setActiveVoteTitle', data.active_sessions[0]);
            dispatch('getAllVotes');
          }
        })
        .catch(response => {
          console.log('session info error', response);
        })
    },
  },
  modules: {
  }
})
