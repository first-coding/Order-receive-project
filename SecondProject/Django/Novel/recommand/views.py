from .models import suggest
import pymysql
from django.http import JsonResponse
from django.http import HttpResponse
from Manage.models import User 
from pymysql.converters import escape_string
import datetime
from datetime import datetime


def get_cookie(request):
    cookie_user = request.POST.get('cookies')
    return HttpResponse("ok")


# Create your views here.
def ShowData(request):
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="20011008",port=3306,db='novel')
        print("ShowData mysql连接成功")
    except:
        print("ShowData mysql连接失败")
    cursor = db.cursor()
    cursor.execute('select 照片链接,小说名,小说链接,推荐信息,作品信息 from novels order by 更新时间 desc limit 10')
    data = cursor.fetchall()
    db.close()
    return JsonResponse(data,json_dumps_params={'ensure_ascii': False}, safe=False)


def Suggest(request):
    user_name = request.GET.get('user_name','')
    print(user_name)
    result = User.objects.filter(user_name=user_name)
    if(result.count()!=0):
        id=result.values()[0]['id']
    else:
        id=-1
    if (suggest.objects.filter(flag=id).count())==0:
        try:
            db = pymysql.connect(host="localhost",user='root',passwd="20011008",port=3306,db='novel')
            print("Suggest mysql连接成功")
        except:
            print("Suggest mysql连接失败")
        cursor = db.cursor()
        cursor.execute('select 小说名 from novels order by 推荐信息 asc limit 10')
        data = cursor.fetchall()
        db.close()
        return JsonResponse(data,json_dumps_params={'ensure_ascii': False}, safe=False)
    else:
        data=list(suggest.objects.filter(flag=id).values().order_by('time'))
        lists = []
        for i in data:
            lists.append([i['novel_name']])
        return JsonResponse(lists,json_dumps_params={'ensure_ascii': False}, safe=False)
    
def Insert(request):
    novel_name = request.GET.get('novel_name','')
    user_name = request.GET.get('user_name','')
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="20011008",port=3306,db='novel')
        print("mysql连接成功")
    except:
        print("mysql连接失败")
    cursor = db.cursor()
    cursor.execute("select 更新时间 from novels where 小说名=%s",escape_string(novel_name))
    times = cursor.fetchall()
    if len(times)==0:
        return HttpResponse("error")
    db.close()
    if (User.objects.filter(user_name=user_name))==0:
        print("用户不存在")
    else:
        flag = User.objects.get(user_name=user_name).id
    time = datetime.strptime(times[0][0],'%Y-%m-%d')
    print(user_name,novel_name,flag,time)
    if (suggest.objects.filter(novel_name=novel_name,user_name=user_name).count())==0:
        suggest.objects.create(user_name=user_name,novel_name=novel_name,flag=flag,time=time)
    if (suggest.objects.filter(user_name=user_name,novel_name=novel_name,flag=flag,time=time).count())==1:
        return HttpResponse("ok")
    else:
        return HttpResponse("error")

def search(request):
    novel_name = request.GET.get('novel_name','')
    print(novel_name)
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="20011008",port=3306,db='novel')
        print("mysql连接成功")
    except:
        print("mysql连接失败")
    cursor = db.cursor()
    cursor.execute("select * from novels where 小说名=%s",escape_string(novel_name))
    datas = cursor.fetchall()
    if len(datas)==0:
        return HttpResponse("error")
    else:
        return JsonResponse(datas,json_dumps_params={'ensure_ascii': False}, safe=False)
