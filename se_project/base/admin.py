from django.contrib import admin
from . import models

admin.site.register(models.MCP)
admin.site.register(models.Vehicle)
admin.site.register(models.Route)

# Register your models here.
