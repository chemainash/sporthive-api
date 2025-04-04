from django.urls import path
from core.views import index, login_view, coach_dashboard, signup_view, athlete_dashboard, event_dashboard, admin_dashboard
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.urls import path
urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('coach/dashboard/', login_required(coach_dashboard), name='coach_dashboard'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('signup/', signup_view, name='signup'),
    path('athlete/dashboard/', login_required(athlete_dashboard), name='athlete_dashboard'),
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),
    path('event/dashboard/', login_required(event_dashboard), name='event_dashboard'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('admin/dashboard/', login_required(admin_dashboard), name='admin_dashboard'),
]