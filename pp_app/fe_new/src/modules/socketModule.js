import io from 'socket.io-client';
import host from '@/modules/hostResolver';

const socket = io.connect(`https://${host}`);

export default socket;
