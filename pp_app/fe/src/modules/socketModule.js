import host from '@/modules/hostResolver';
import io from 'socket.io-client';

const socket = io.connect(`http://${host}`);

export default socket;
