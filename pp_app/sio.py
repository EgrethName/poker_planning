import socketio

async_mode = 'eventlet'

sio = socketio.Server(async_mode=async_mode)
