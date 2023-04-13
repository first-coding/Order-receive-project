from django.db import models

# Create your models here.
class suggest(models.Model):
    user_name = models.TextField("帐号",default="")
    novel_name = models.TextField("小说名",default="")
    flag = models.TextField("标记",default=0)
    time = models.DateTimeField("更新时间",default="")