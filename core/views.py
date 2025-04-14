from django.shortcuts import render, get_object_or_404
from datetime import datetime
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Notification

from django.db import models
from core.forms import CustomUserCreationForm
from core.models import Team, Event

def index(request):
    return render(request, 'index.html')

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            # Redirect based on user type
            if user.user_type == "athlete":
                return redirect("athlete-dashboard")
            elif user.user_type == "coach":  
                return redirect("coach-dashboard")
            elif user.is_superuser:
                return redirect("admin-dashboard")
            else:
                messages.error(request, "Unauthorized access")
                return redirect("index")  

        else:
            messages.error(request, "Invalid username or password")

    return render(request, "login.html")


@login_required
def coach_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'coach':
        return render(request, 'coach_dashboard.html')
    else:
        return redirect('login')
    
def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created successfully! You can now log in.")
            return redirect('login')  # change this to your login URL name
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})

def athlete_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        events, events_count, coming_in = all_events_view(request)
        print(coming_in)

        return render(request, 'athlete_dashboard.html', {
                    'events': events,
                    'events_count': events_count,
                    'coming_in': coming_in
                })
    else:
        return redirect('login')
        
def event_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        return render(request, 'event_dashboard.html')
    else:
        return redirect('login')
    
def admin_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'admin':
        return render(request, 'admin_dashboard.html')
    else:
        return redirect('login')
    
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('event-dashboard')  # Redirect to login after signup
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

def community(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        return render(request, 'community.html')
    else:
        return render(request, 'index.html')
def about_us(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        return render(request, 'about_us.html')
    else:
        return render(request, 'index.html')
    
def facilities(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        return render(request, 'facilities.html')
    else:
        return render(request, 'index.html')



@login_required(redirect_field_name='login')
def user_teams_view(request):
    user = request.user

    # Query for teams involving this user
    teams = Team.objects.filter(
        models.Q(players=user) |
        models.Q(individual_player=user) |
        models.Q(coach=user)
    ).distinct()

    return render(request, 'team.html', {'teams': teams})

def all_events_view(request):
    events = Event.objects.all().order_by('date')
    coming_in = events.filter(date__gt=datetime.now()).order_by('date')
    events_count = events.count()
    print(coming_in)

    return events, events_count, coming_in

@login_required
def user_notifications_view(request):
    notifications = Notification.objects.filter(user=request.user).order_by('-date')
    unread_count = notifications.filter(is_read=False).count()

    return render(request, 'notifications.html', {
        'notifications': notifications,
        'unread_count': unread_count,
    })

@require_http_methods(["PATCH"])
def mark_notification_read(request, notification_id):
    # Get the notification instance
    notification = get_object_or_404(Notification, id=notification_id)

    # Parse the JSON body of the PATCH request
    data = json.loads(request.body)

    # Update is_read field
    if data.get('is_read') is not None:
        notification.is_read = data['is_read']
        notification.save()

    return JsonResponse({'success': True})