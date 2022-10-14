from django.db import models
from django.utils import timezone
# Create your models here.
"""
Create a pattern for ID of MCP, Vehicle, Route, Person
"""
class MCP(models.Model):

    id = models.CharField(max_length=100, primary_key = True)
    location = models.JSONField()
    capacity = models.FloatField()

class Vehicle(models.Model):

    id = models.CharField(max_length=100, primary_key = True)
    fuel_capacity = models.FloatField()
    capacity = models.FloatField()

class Route(models.Model):

    id = models.CharField(max_length=100, primary_key= True)
    seq_mcps_id = models.JSONField()
    vehicle_id = models.CharField(max_length=100)
