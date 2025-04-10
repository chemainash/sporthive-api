from django.urls import path
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from core.views import index, login_view, coach_dashboard, athlete_dashboard,\
    event_dashboard, admin_dashboard,signup_view,register,community,about_us,facilities


urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('coach/dashboard/', login_required(coach_dashboard), name='coach-dashboard'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('athlete/dashboard/', login_required(athlete_dashboard), name='athlete-dashboard'),
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),
    path('event/dashboard/', login_required(event_dashboard), name='event-dashboard'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('admin/dashboard/', login_required(admin_dashboard), name='admin-dashboard'),
    path('signup/', signup_view, name='signup'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('register/', register, name='register'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('community/', community, name='community'),
    path('about/us/', about_us, name='about-us'),
    path('facilities/', facilities, name='facilities'),
    
]