import uuid


class SessionExists(Exception):
    pass


class Session:
    def __init__(self, name):
        self.users = []
        self.name = name
        self.vote = Vote()
        self.completed_votes = []
        self.id = self.generate_sess_id()

    def __str__(self):
        return "Session {}".format(self.name)

    def add_user(self, user):
        if len(self.users) > 4:
            raise ValueError
        self.users.append(user)

    @staticmethod
    def generate_sess_id():
        raw_id = uuid.uuid4()
        sess_id = str(raw_id.hex)[:11]
        return sess_id

    def save_vote(self):
        self.completed_votes.append(self.vote.statistics)


class SessionHolder:
    def __init__(self):
        self.sessions = []

    def add_session(self, session):
        for added_session in self.sessions:
            if session.id == added_session.id:
                raise SessionExists
        if not isinstance(session, Session):
            raise ValueError
        self.sessions.append(session)

    def get_session_by_id(self, sess_id):
        for sess in self.sessions:
            if sess.id == sess_id:
                return sess


class Vote:
    def __init__(self):
        self.votes = {}

    def set_vote(self, username, vote_value):
        self.votes[username] = vote_value

    @property
    def average(self):
        sum = 0
        for value in self.votes.values():
            if isinstance(sum, int):
                sum += value

        _average = sum / len(self.votes)
        return _average

    def refresh_votes(self):
        self.votes = {}

    @property
    def statistics(self):
        return {
            'average': self.average,
            'votes': self.votes
        }
