from django.shortcuts import render
from django.contrib.auth import authenticate, login
# Removed unused import of CustomUser
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from core.forms import CustomUserCreationForm

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
        return render(request, 'athlete_dashboard.html')
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

