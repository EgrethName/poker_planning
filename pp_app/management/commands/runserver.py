from django.core.management.commands.runserver import Command as RunCommand

Command = RunCommand
#
# from pp_app.views import sio
#
#
# class Command(RunCommand):
#     help = 'Run the Socket.IO server'
#
#     def handle(self, *args, **options):
#         if sio.async_mode == 'threading':
#             super(Command, self).handle(*args, **options)
#         elif sio.async_mode == 'eventlet':
#             # deploy with eventlet
#             import eventlet
#             import eventlet.wsgi
#             from pp_project.wsgi import application
#             eventlet.wsgi.server(eventlet.listen(('', 8000)), application)
#         else:
#             print('Unknown async_mode: ' + sio.async_mode)