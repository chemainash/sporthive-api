from django.contrib import admin
from core.models import *

admin.site.register(User)
admin.site.register(Team)
admin.site.register(Facility)
admin.site.register(Event)
admin.site.register(Notification)
admin.site.register(Result)
admin.site.register(Fixture)

