import { createStore } from 'vuex';

import cloneDeep from 'lodash/cloneDeep';
import EventBus from '@/modules/eventBus';
import { xhr, baseSessionId } from '@/modules/xhr';
import socket from '@/modules/socketModule';

export interface State {
  playersList: Array<string>,
  playerName: string,
  isVoteActive: boolean,
  isVoteCompleted: boolean,
  voteStatistics: {
    id: string,
    title: string,
    average: number,
    votes: Record<string, unknown>,
  },
  isVoteSet: false,
  sessionId: string,
  wsSessionId: string,
  completedVotes: Array<unknown>,
  roomName: string,
  activeVoteTitle: string,
  gameLink: string,
  nameResolveSuccess: boolean,
}

export default createStore<State>({
  state: {
    playersList: ['Player1', 'Player2', 'Player3', 'Player1', 'Player2', 'Player3', 'Player1', 'Player2', 'Player3',
      'Player1', 'Player2', 'Player3'],
    playerName: '',
    isVoteActive: false,
    isVoteCompleted: false,
    voteStatistics: {
      id: '',
      title: '',
      average: 0,
      votes: {},
    },
    isVoteSet: false,
    sessionId: baseSessionId,
    wsSessionId: socket.id,
    completedVotes: [],
    roomName: '',
    activeVoteTitle: '',
    nameResolveSuccess: false,
    gameLink: window.location.href,
  },
  mutations: {
    setSessionId: (state, id) => {
      state.sessionId = id;
    },
    setPlayersList: (state, payload) => {
      state.playersList = payload;
    },
    addNewUser: (state, name) => {
      if (state.playersList.indexOf(name) === -1) {
        state.playersList.push(name);
      }
    },
    removeUser: (state, nameToRemove) => {
      state.playersList = state.playersList.filter((name) => name !== nameToRemove);
    },
    setVotes: (state, payload) => {
      state.voteStatistics.votes = { ...state.voteStatistics.votes, ...payload };
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
      xhr.get(`game/${state.sessionId}/users`)
        .then(({ data }) => {
          commit('setPlayersList', data.session_users);
        });
    },
    getAllVotes({ commit, state }) {
      xhr.get(`game/${state.sessionId}/current_votes`)
        .then(({ data }) => {
          commit('setVotes', data);
        });
    },
    endVote({ commit, state }) {
      return new Promise((resolve, reject) => {
        xhr.post(`game/${state.sessionId}/end_vote`)
          .then(({ data }) => {
            commit('setVoteActive', false);
            commit('setVoteCompleted', true);
            resolve(data.statistics);
          })
          .catch((): void => reject(new Error('Cannot end the game')));
      });
    },
    sendVote({ commit, state, dispatch }, payload) {
      xhr.post(`game/${state.sessionId}/vote`, {
        user_name: state.playerName,
        vote_value: payload,
      })
        .then(() => {
          dispatch('getAllVotes');
          commit('setVoteSet');
        });
    },
    startNewVote({ commit, state }, payload) {
      xhr.post(`game/${state.sessionId}/new_vote`, {
        title: payload,
      })
        .then(() => {
          commit('clearVoteStats', true);
          commit('setVoteActive', true);
          commit('setVoteCompleted', false);
        })
        .catch(() => {
          commit('setVoteActive', false);
          commit('setVoteCompleted', false);
        });
    },
    getSessionInfo({ commit, state, dispatch }) {
      xhr.get(`game/${state.sessionId}/info`)
        .then(({ data }) => {
          commit('setRoomName', data.session_name);
          // commit('setSessionId', data.session_id);
          commit('setPlayersList', data.session_users);
          commit('setInitialCompletedVotes', data.completed_votes);

          if (data.active_sessions.length) {
            commit('setVoteActive', true);
            commit('setActiveVoteTitle', data.active_sessions[0]);
            dispatch('getAllVotes');
          }
        })
        .catch((response): void => {
          console.log('session info error', response);
        });
    },
    sendCreateGame({ commit, state, dispatch }, name: string) {
      return new Promise((resolve, reject) => {
        xhr.post('/new_game', {
          game_name: name,
        })
          .then((response) => {
            console.log('resp', response);
            commit('setSessionId', response.data.id);
            resolve(response.data.id);
          })
          .catch((e) => {
            console.log('failed to create');
            reject();
          });
      });
    },
    enterGame({ commit, state, dispatch }, name) {
      return new Promise((resolve, reject) => {
        xhr.post(`game/${state.sessionId}/join_game`, {
          user_name: name,
          ws_sid: state.wsSessionId,
        })
          .then(() => {
            localStorage.name = name;
            commit('setPlayerName', name);
            dispatch('getAllPlayers');
            resolve(name);
          })
          .catch(() => {
            reject();
          });
      });
    },
    activate({ commit }) {
      socket.on('got_new_vote', (msg: unknown) => {
        commit('setVotes', msg);
      });

      socket.on('new_user_joined', (msg: unknown) => {
        commit('addNewUser', msg);
      });

      socket.on('user_left', (msg: unknown) => {
        commit('removeUser', msg);
      });

      socket.on('new_vote_started', (msg: unknown) => {
        commit('setActiveVoteTitle', msg);
        commit('clearVoteStats', true);
        commit('setVoteActive', true);
        commit('setVoteCompleted', false);
        EventBus.emit('newVoteStarted');
      });

      socket.on('vote_completed', (msg: unknown) => {
        commit('setVoteActive', false);
        commit('setVoteCompleted', true);
        commit('setVoteStats', msg);
        EventBus.emit('voteStatsAvailable', msg);
        EventBus.emit('voteCompleted');
      });
    },
    resolveAfter2Seconds() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
    },
  },

  getters: {
    getCompletedVotes: (state) => state.completedVotes,
  },

  modules: {
  },
});
