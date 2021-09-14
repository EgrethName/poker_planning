from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('new_game', views.create_session, name='create_session'),
    path('sessions', views.get_all_sessions, name='get_all_sessions'),
    path('signup', views.sign_up, name='sign_up'),
    path('login', views.log_in, name='log_in'),
    path('socket.io/', views.index, name='index'),
    re_path(r'game/(?P<sess_id>\S+)/join', views.join_the_session, name='join_the_session'),
    re_path(r'game/(?P<sess_id>\S+)/new_vote', views.create_vote_session, name='create_vote_session'),
    re_path(r'game/(?P<sess_id>\S+)/users', views.get_all_users, name='get_all_users'),
    re_path(r'game/(?P<sess_id>\S+)/votes_sessions', views.get_session_votes, name='get_session_votes'),
    re_path(r'game/(?P<sess_id>\S+)/vote', views.set_vote, name='set_vote'),
    re_path(r'game/(?P<sess_id>\S+)/current_votes', views.show_current_votes, name='show_current_votes'),
    re_path(r'game/(?P<sess_id>\S+)/end_vote', views.end_vote_session, name='end_vote_session'),
    re_path(r'game/(?P<sess_id>\S+)/info', views.info, name='info'),
    re_path(r'game/(?P<sess_id>\S+)', views.get_session_page, name='get_session_page'),
]
