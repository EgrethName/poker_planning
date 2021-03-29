import host from '@/modules/hostResolver';
import io from 'socket.io-client';

const socket = io.connect(`https://${host}`);

export default socket;
