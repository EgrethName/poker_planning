import uuid


class SessionExceptions(Exception):
    pass


class Session:
    def __init__(self, name):
        self.name = name
        self.users = []
        self.ws_users_bundle = {}
        self.vote_holder = []
        self.id = self.generate_sess_id()
        self.current_vote_session = None
        self.counter = 0

    def __str__(self):
        return "Session {}".format(self.name)

    @staticmethod
    def generate_sess_id():
        raw_id = uuid.uuid4()
        sess_id = str(raw_id.hex)[:11]
        return sess_id

    def add_user(self, user):
        if len(self.users) > 25:
            raise ValueError
        if user not in self.users:
            self.users.append(user)

    def add_vote_session(self, sess_id, title):
        self.current_vote_session = VoteSession(sess_id, title, self.counter)
        self.vote_holder.append(self.current_vote_session)
        self.counter += 1
        return self.current_vote_session.votesess_id

    def set_vote(self, username, vote_value):
        self.current_vote_session.votes[username] = vote_value

    def end_current_vote(self):
        stat = self.current_vote_session.statistics
        print(stat)
        self.current_vote_session.is_active = False
        self.current_vote_session = None
        return stat

    def delete_user(self, sid):
        user = self.ws_users_bundle.pop(sid, None)
        if user in self.users:
            self.users.remove(user)
            return user


class SessionHolder:
    def __init__(self):
        self.sessions = []

    def add_session(self, session):
        for added_session in self.sessions:
            if session.id == added_session.id:
                raise SessionExceptions
        if not isinstance(session, Session):
            raise ValueError
        self.sessions.append(session)

    def get_session_by_id(self, sess_id):
        for sess in self.sessions:
            if sess.id == sess_id:
                return sess
        raise SessionExceptions('Session with same id is not found')


class VoteSession:
    def __init__(self, session_id, title, counter):
        self.votesess_id = self.generate_vote_id(session_id, counter)
        self.title = title
        self.votes = {}
        self.is_active = True
        self.counter = counter

    @staticmethod
    def generate_vote_id(session_id, counter):
        vote_id = session_id + "_" + str(counter)
        return vote_id

    @property
    def average(self):
        sum = 0
        validate_users_number = len(self.votes)
        for value in self.votes.values():
            try:
                value = int(value)
                sum += value
            except ValueError:
                validate_users_number -= 1
        try:
            _average = sum / validate_users_number
        except ZeroDivisionError:
            _average = 0

        return _average

    def refresh_votes(self):
        self.votes = {}

    @property
    def statistics(self):
        return {
            'id': self.votesess_id,
            'title': self.title,
            'average': self.average,
            'votes': self.votes
        }
