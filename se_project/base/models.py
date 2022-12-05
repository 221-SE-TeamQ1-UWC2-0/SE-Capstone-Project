from django.db import models
from django.utils import timezone
from usr.models import UWC_User
# Create your models here.
"""
Create a pattern for ID of MCP, Vehicle, Route, Person
"""
class MCP(models.Model):

    id = models.CharField(max_length=100, primary_key = True)
    location = models.JSONField()
    capacity = models.FloatField()
    lat = models.FloatField()
    long = models.FloatField()

class Vehicle(models.Model):

    id = models.CharField(max_length=100, primary_key = True)
    fuel_capacity = models.FloatField()
    capacity = models.FloatField()
    driver = models.ForeignKey(UWC_User, on_delete=models.SET_NULL, null=True)

class Route(models.Model):

    id = models.CharField(max_length=100, primary_key= True)
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