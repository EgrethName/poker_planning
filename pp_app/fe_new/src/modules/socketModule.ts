import ioclient from 'socket.io-client';
import host from '@/modules/hostResolver';

const socket = ioclient(`http://${host}`);

export default socket;
