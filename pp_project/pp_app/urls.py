from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('new_game', views.create_session, name='create_session'),
    path('sessions', views.get_all_sessions, name='get_all_sessions'),
    re_path(r'(?P<game_name>\S+)/join', views.join_the_session, name='join_the_session'),
    re_path(r'(?P<game_name>\S+)/members', views.get_all_members, name='get_all_members'),
    re_path(r'(?P<game_name>\S+)/vote', views.set_vote, name='set_vote'),
    re_path(r'(?P<game_name>\S+)/current_votes', views.show_current_votes, name='show_current_votes'),
    re_path(r'(?P<game_name>\S+)/end_vote', views.end_vote, name='end_vote'),
    re_path(r'(?P<game_name>\S+)', views.get_session_page, name='get_session_page'),

]
