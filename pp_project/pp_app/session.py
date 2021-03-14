import uuid


class SessionExists(Exception):
    pass


class Member:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "Member {}".format(self.name)

    def __repr__(self):
        return "Member {}".format(self.name)


class Session:
    def __init__(self, name):
        self.members = []
        self.name = name
        self.vote = Vote()
        self.id = self.generate_sess_id()

    def __str__(self):
        return "Session {}".format(self.name)

    def add_member(self, member):
        if len(self.members) > 4:
            raise ValueError
        self.members.append(member)

    @staticmethod
    def generate_sess_id():
        raw_id = uuid.uuid4()
        sess_id = str(raw_id.hex)[:11]
        return sess_id


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

    def set_vote(self, member_name, vote_value):
        self.votes[member_name] = vote_value

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

    def votes_statistics(self):
        return {
            'average': self.average,
            'votes': self.votes
        }
