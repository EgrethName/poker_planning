from django.db import models
from django.contrib.auth.models import User


class SessionTable(models.Model):
    sess_id = models.CharField()
    name = models.CharField()


class VoteTable(models.Model):
    value = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sess_id = models.OneToOneField(SessionTable, on_delete=models.CASCADE)


class SessionResults(models.Model):
    value = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)