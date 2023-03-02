from django.shortcuts import render
from django.views import View
from .forms import userForm


# Create your views here.
class home_view(View):
	template_name = 'index.html'


	def get(self, request, *args, **Kwargs):
		context = {}
		return render(request, self.template_name, context)

	def post(self, request, *args, **Kwargs):
		form = userForm(request.POST or None)
		if form.is_valid():
			form.save()
		# name = request.POST.get('name')
		# email = request.POST.get('email')
		# phone = request.POST.get('phone')
		# message = request.POST.get('message')

		# print('name: ',name, 'email: ',email, 'phone: ', phone, 'message: ', message)

		return render(request, self.template_name, {})