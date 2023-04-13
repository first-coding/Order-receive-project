from django.db import models

# Create your models here.
class suggest(models.Model):
    user_name = models.TextField("帐号",default="")
    movie_name = models.TextField("电影名",default="")
    flag = models.TextField("标记",default=0)
    time = models.DateTimeField("放映时间",default="")