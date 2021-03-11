from django.shortcuts import render
from .session import Session, Member, SessionHolder, SessionExists
import os
import json

from django.http import HttpResponse, JsonResponse

import socketio

basedir = os.path.dirname(os.path.realpath(__file__))
session_holder = SessionHolder()


def index(request):
    return HttpResponse(open(os.path.join(basedir, 'templates/index.html')))


def create_session(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        session = Session(body['game_name'])

        try:
            session_holder.add_session(session)
        except SessionExists:
            return JsonResponse(status=400, data={'error': "session with {} name exists".format(session.name)})

        print(session_holder)

        return JsonResponse({'id': session.name})

    return HttpResponse(status=405)


def join_the_session(request, game_name):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        member = Member(body['user_name'])
        session = session_holder.get_session_by_name(game_name)

        try:
            session.add_member(member)
        except ValueError:
            return JsonResponse(status=400, data={'error': "too many members in {} session".format(session.name)})

        print("session {} members are: {}".format(session.name, session.members))
        return HttpResponse(status=200)

    return HttpResponse(status=405)


def get_session_page(request, game_name):
    if request.method == "GET":
        return render(request, 'game.html')
    return HttpResponse(status=405)


def get_all_sessions(request):
    session_names = [session.name for session in session_holder.sessions]
    # json_sessions = json.dumps(session_holder.sessions)
    print(session_names)
    return JsonResponse(status=200, data={'active_sessions': session_names})


def get_all_members(request, game_name):
    session = session_holder.get_session_by_name(game_name)
    members_names = [member.name for member in session.members]
    print(members_names)
    return JsonResponse(status=200, data={'session_members': members_names})


def set_vote(request, game_name):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        member = body['user_name']
        value = body['vote_value']
        session = session_holder.get_session_by_name(game_name)
        session.vote.set_vote(member, value)
        return HttpResponse(status=200)

    return HttpResponse(status=405)


def show_current_votes(request, game_name):
    if request.method == "GET":
        session = session_holder.get_session_by_name(game_name)
        votes = session.vote.votes
        return JsonResponse(status=200, data=votes)

    return HttpResponse(status=405)


def end_vote(request, game_name):
    if request.method == "POST":
        session = session_holder.get_session_by_name(game_name)
        votes = session.vote.votes_statistics()
        session.vote.refresh_votes()
        return JsonResponse(status=200, data={'statistics': votes})

    return HttpResponse(status=405)
