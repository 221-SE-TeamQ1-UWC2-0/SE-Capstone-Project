from django.db import models
from django.utils import timezone
from usr.models import UWC_User
# Create your models here.
"""
Create a pattern for ID of MCP, Vehicle, Route, Person

UPDATED: REMOVE ID FIELD FROM MCP, VEHICLE AND ROUTE SINCE DJANGO ALREADY SUPPORT AUTO INCREMENTAL ID FIELD
"""
class MCP(models.Model):

    location = models.JSONField()
    capacity = models.FloatField()
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)

class Vehicle(models.Model):

    fuel_capacity = models.FloatField()
    capacity = models.FloatField()
    driver = models.ForeignKey(UWC_User, on_delete=models.SET_NULL, null=True)

class Route(models.Model):

    seq_mcps_id = models.JSONField()
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)

class Task(models.Model):
    body = models.TextField(max_length=255, blank=False)
    assigned_to = models.ForeignKey(UWC_User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        params = self.body.split('|')
        return params[1]

    def save(self,*args, **kwargs):
        self.body = str(timezone.now().date()) + '|' + self.body
        return super(Task, self).save(*args, **kwargs)