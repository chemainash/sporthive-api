from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

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
            elif user.user_type == "coach":  # Assuming "provider" means doctor
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
    

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to login after signup
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def athlete_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'athlete':
        return render(request, 'athlete_dashboard.html')
    else:
        return redirect('login')
        
def event_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'event':
        return render(request, 'event_dashboard.html')
    else:
        return redirect('login')
    
def admin_dashboard(request):
    if request.user.is_authenticated and request.user.user_type == 'admin':
        return render(request, 'admin_dashboard.html')
    else:
        return redirect('login')
    
    
    