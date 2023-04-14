from django.http import HttpResponse
from django.http import JsonResponse
from .models import *

def register(request):
    register_user = request.POST.get('user','')
    register_pwd = request.POST.get('pwd','')
    print(register_user)
    print(register_pwd)
    if (User.objects.filter(user_name=register_user).count())==1:
        return HttpResponse("该帐号被注册，请重新输入")
    else:
        User.objects.create(user_name=register_user,user_pwd=register_pwd)
        if (User.objects.filter(user_name=register_user).count())==1:
            return HttpResponse("注册成功")
        else:
            return HttpResponse("注册失败")
    
def login(request):
    login_user = request.POST.get('user','')
    login_pwd = request.POST.get('pwd','')
    print(User.objects.filter(user_name=login_user,user_pwd=login_pwd))
    print(login_user,login_pwd)
    if login_user and login_pwd:
        if (User.objects.filter(user_name=login_user,user_pwd=login_pwd).count()==1):
            response=HttpResponse("登录成功")
            response.set_cookie('login_user',login_user)
            return response
        else:
            return HttpResponse("登录失败")
    else:
        return HttpResponse("登录失败")