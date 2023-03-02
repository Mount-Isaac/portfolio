from django.db import models

# Create your models here.
class user_message(models.Model):
	name = models.CharField(max_length=120, blank=False, null=False)
	email = models.CharField(max_length=150, blank=True, null=True)
	phone = models.CharField(max_length=120, blank=False, null=False)
	message = models.TextField(blank=False, null=True)


	def __str__(self):
		return f'{self.name.split(" ")[0].capitalize()} Message'