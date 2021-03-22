import host from '@/modules/hostResolver';
import io from 'socket.io-client';
// import store from '../views/game/store'


const socket = io.connect(`http://${host}:80`);

// socket.on('connect', () => {
//     console.log('connected');
//     store.commit('setWSSessionId', socket.id);
//   });

export default socket;
