from django.urls import path
from core.views import index , login_view,coach_dashboard
urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('coach/dashboard/', coach_dashboard, name='coach_dashboard'),
]