from django import forms
from .models import user_message


class userForm(forms.ModelForm):
	class Meta:
		model = user_message
		fields = '__all__'