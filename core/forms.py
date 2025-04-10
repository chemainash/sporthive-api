from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, UserType

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'first_name', 'last_name',
            'age', 'contacts', 'user_type', 'profile_picture', 'sport',
            'password1', 'password2'
        ]
        widgets = {
            'contacts': forms.Textarea(attrs={'placeholder': 'Enter JSON format e.g. {"phone": "1234567890"}'}),
        }
