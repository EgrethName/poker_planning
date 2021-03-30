import socketio

async_mode = 'eventlet'

sio = socketio.Server(async_mode=async_mode, cors_allowed_origins="*", engineio_logger=True, logger=True)
