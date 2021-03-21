from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .session import Session, SessionHolder, SessionExceptions, VoteSession
from .models import VoteTable

import socketio
import os
import json

basedir = os.path.dirname(os.path.realpath(__file__))
session_holder = SessionHolder()
sio = socketio.Server()


def index(request):
    return HttpResponse(open(os.path.join(basedir, 'templates/index.html')))


def create_session(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        session = Session(body['game_name'])
        try:
            session_holder.add_session(session)
        except SessionExceptions:
            return JsonResponse(status=400, data={'error': "session with {} name exists".format(session.name)})

        return JsonResponse({'id': session.id})

    return HttpResponse(status=405)


def create_vote_session(request, sess_id):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        title = body['title']
        session = session_holder.get_session_by_id(sess_id)
        votesess_id = session.add_vote_session(sess_id, title)
        return JsonResponse({'id': votesess_id})

    return HttpResponse(status=405)


def join_the_session(request, sess_id):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = body['user_name']   # передача строкой, переделать через USER
        session = session_holder.get_session_by_id(sess_id)
        try:
            session.add_user(user)
        except ValueError:
            return JsonResponse(status=400, data={'error': "too many users in {} vote session".format(session.name)})

        print("session {} users are: {}".format(session.name, session.users))
        return HttpResponse(status=200)

    return HttpResponse(status=405)


def get_session_page(request, sess_id):
    if request.method == "GET":
        return render(request, 'game.html')

    return HttpResponse(status=405)


def get_all_sessions(request):
    sessions_id = [session.id for session in session_holder.sessions]
    return JsonResponse(status=200, data={'active_sessions': sessions_id})


def get_session_votes(request, sess_id):
    if request.method == "GET":
        session = session_holder.get_session_by_id(sess_id)
        sessions_votes = [vote_session.votesess_id for vote_session in session.vote_holder]
        return JsonResponse(status=200, data={'active_vote_sessions': sessions_votes})


def get_all_users(request, sess_id):
    session = session_holder.get_session_by_id(sess_id)
    users_names = [user for user in session.users]
    return JsonResponse(status=200, data={'session_users': users_names})


def info(request, sess_id):
    session = session_holder.get_session_by_id(sess_id)
    vote_sessions = [vote_session.title for vote_session in session.vote_holder]
    active_vote_sessions = [vote_session.title for vote_session in session.vote_holder if vote_session.is_active]
    users = session.users
    return JsonResponse(status=200, data={'session_id': sess_id,
                                          'session_name': session.name,
                                          'session_users': users,
                                          'vote_sessions': vote_sessions,
                                          'active_sessions': active_vote_sessions
                                          })


def set_vote(request, sess_id):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = body['user_name']
        value = body['vote_value']
        # vote = VoteTable(user, value)
        # vote.save()
        session = session_holder.get_session_by_id(sess_id)
        session.set_vote(user, value)
        return HttpResponse(status=200)

    return HttpResponse(status=405)


def show_current_votes(request, sess_id):
    if request.method == "GET":
        session = session_holder.get_session_by_id(sess_id)
        votes = session.current_vote_session.votes
        return JsonResponse(status=200, data=votes)

    return HttpResponse(status=405)


def end_vote_session(request, sess_id):
    if request.method == "POST":
        session = session_holder.get_session_by_id(sess_id)
        stat = session.end_current_vote()
        return JsonResponse(status=200, data={'statistics': stat})

    return HttpResponse(status=405)


def sign_up(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.create_user(body['username'], body['password'])
        user.save()
        return HttpResponse(status=200)

    return HttpResponse(status=405)


def log_in(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = authenticate(username=body['username'], password=body['password'])
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponse(status=200)
            else:
                raise Exception('Disabled account')
        else:
            raise Exception('Invalid login/password')
