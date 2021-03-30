import socketio


async_mode = None
sio = socketio.Server(async_mode=async_mode)


@sio.event
def connect(sid, environ):
    sio.emit('my_response', {'data': 'Connected', 'count': 0}, room=sid)

