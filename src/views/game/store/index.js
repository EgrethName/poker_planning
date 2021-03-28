import Vue from 'vue'
import Vuex from 'vuex'

import cloneDeep from 'lodash/cloneDeep';
import EventBus from '@/modules/eventBus';
import { xhr, baseSessionId } from '@/modules/xhr';
import socket from '@/modules/socketModule';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    playersList: ['Player1', 'Player2', 'Player3'],
    playerName: '',
    isVoteActive: false,
    isVoteCompleted: false,
    voteStatistics: {
      id: '',
      title: '',
      average: 0,
      votes: {}
    },
    isVoteSet: false,
    sessionId: baseSessionId,
    wsSessionId: socket.id,
    completedVotes: [],
    roomName: '',
    activeVoteTitle: '',
    gameLink: window.location.href
  },
  mutations: {
    setSessionId: (state, id) => {
      state.sessionId = id;
    },
    setPlayersList: (state, payload) => {
      state.playersList = payload;
    },
    addNewUser: (state, name) => {
      console.log(state.playersList.indexOf(name), name, state.playersList);
      if (state.playersList.indexOf(name) === -1) {
        state.playersList.push(name);
      }
    },
    removeUser: (state, nameToRemove) => {
      console.log(state.playersList.indexOf(nameToRemove), nameToRemove, state.playersList);
      state.playersList = state.playersList.filter(name => name !== nameToRemove);
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
    setInitialCompletedVotes: (state, completedVotes) => {
      state.completedVotes = cloneDeep(completedVotes);
    },
    setVoteStats: (state, stats) => {
      console.log('setting vote stats', stats);
      state.completedVotes.push(stats);
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
    setWSSessionId: (state, id) => {
      state.wsSessionId = id;
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
      return new Promise(( resolve, reject ) => {
        xhr.post(`${state.sessionId}/end_vote`)
          .then(({ data }) => {
            console.log('end vote', data);
            commit('setVoteActive', false);
            commit('setVoteCompleted', true);
            resolve(data.statistics);
          })
          .catch(() => reject('Cannot end the game'))
        });
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
          commit('setInitialCompletedVotes', data.completed_votes);

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
    activate({ commit }) {
      socket.on('got_new_vote', msg => {
        console.log('got new vote', msg);
        commit('setVotes', msg);
      });

      socket.on('new_user_joined', msg => {
        console.log('new_user_joined', msg);
        commit('addNewUser', msg);
      });

      socket.on('user_left', msg => {
        console.log('user_left', msg);
        commit('removeUser', msg);
      });

      socket.on('new_vote_started', msg => {
        commit('setActiveVoteTitle', msg);
        commit('clearVoteStats', true);
        commit('setVoteActive', true);
        commit('setVoteCompleted', false);
        EventBus.$emit('newVoteStarted');
      });

      socket.on('vote_completed', msg => {
        commit('setVoteActive', false);
        commit('setVoteCompleted', true);
        commit('setVoteStats', msg);
        EventBus.$emit('voteStatsAvailable', msg);
        EventBus.$emit('voteCompleted');
      });
    },
    resolveAfter2Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
    }
  },
  getters: {
    getCompletedVotes: state => {
      return state.completedVotes;
    }
  },
  modules: {
  }
})
