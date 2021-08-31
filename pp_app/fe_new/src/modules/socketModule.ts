import { io } from 'socket.io-client';
import host from '@/modules/hostResolver';

const socket = io(`https://${host}`);

export default socket;
