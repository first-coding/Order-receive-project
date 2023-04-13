from django.db import models

# Create your models here.
class User(models.Model):
    user_name = models.TextField("账号", default="")
    user_pwd = models.TextField("密码", default="")