from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class UserType(models.TextChoices):
    COACH = 'coach', 'Coach'
    ADMIN = 'admin', 'Admin'
    ATHLETE = 'athlete', 'Athlete'

class User(AbstractUser):
    age = models.IntegerField(null=True, blank=True)
    contacts = models.JSONField(null=True, blank=True)
    user_type = models.CharField(max_length=10, choices=UserType.choices, default=UserType.ATHLETE)

    def __str__(self):
        return f"{self.id} ({self.username})"

class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User, related_name='teams')
    individual_player = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='individual_teams')
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coached_teams')
    kits = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class AvailabilityStatus(models.TextChoices):
    AVAILABLE = 'available', 'Available'
    UNAVAILABLE = 'unavailable', 'Unavailable'

class Facility(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    availability_status = models.CharField(max_length=12, choices=AvailabilityStatus.choices)
    capacity = models.IntegerField()

    def __str__(self):
        return self.name



class Event(models.Model):
    name = models.CharField(max_length=255)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='events')
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Fixture(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='fixtures')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='fixtures')
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.team.name} vs {self.event.name}"


class Outcome(models.TextChoices):
    DRAW = 'draw', 'Draw'
    WIN = 'win', 'Win'
    LOSS = 'loss', 'Loss'

class Result(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='results')
    outcome = models.CharField(max_length=10, choices=Outcome.choices)
    rank = models.IntegerField()
    score = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='results')

    def __str__(self):
        return f"{self.team.name} - {self.outcome} ({self.score})"


class NotificationChannel(models.TextChoices):
    EMAIL = 'email', 'Email'
    SMS = 'sms', 'SMS'

class Notification(models.Model):
    channel = models.CharField(max_length=10, choices=NotificationChannel.choices)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification to {self.user.username} - {self.subject}"






