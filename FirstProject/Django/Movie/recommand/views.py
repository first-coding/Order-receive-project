from .models import suggest
import pymysql
from django.http import JsonResponse
from django.http import HttpResponse
from Manage.models import User 
from pymysql.converters import escape_string
import datetime


def get_cookie(request):
    cookie_user = request.POST.get('cookies')
    return HttpResponse("ok")


# Create your views here.
def ShowData(request):
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="*****",port=3306,db='movie')
        print("ShowData mysql连接成功")
    except:
        print("ShowData mysql连接失败")
    cursor = db.cursor()
    cursor.execute('select 电影名称,超链接,照片链接,类型,评分 from movies order by 评分 desc limit 6')
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
            db = pymysql.connect(host="localhost",user='root',passwd="******",port=3306,db='movie')
            print("Suggest mysql连接成功")
        except:
            print("Suggest mysql连接失败")
        cursor = db.cursor()
        cursor.execute('select 电影名称 from movies order by 评分 asc limit 10')
        data = cursor.fetchall()
        db.close()
        return JsonResponse(data,json_dumps_params={'ensure_ascii': False}, safe=False)
    else:
        data=list(suggest.objects.filter(flag=id).values().order_by('time'))
        lists = []
        for i in data:
            lists.append([i['movie_name']])
        return JsonResponse(lists,json_dumps_params={'ensure_ascii': False}, safe=False)
    
def Insert(request):
    movie_name = request.GET.get('movie_name','')
    user_name = request.GET.get('user_name','')
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="******",port=3306,db='movie')
        print("mysql连接成功")
    except:
        print("mysql连接失败")
    cursor = db.cursor()
    cursor.execute("select 上映时间 from movies where 电影名称=%s",escape_string(movie_name))
    time = cursor.fetchall()
    if len(time)==0:
        return HttpResponse("error")
    db.close()
    if (User.objects.filter(user_name=user_name))==0:
        print("用户不存在")
    else:
        flag = User.objects.get(user_name=user_name).id
    print(user_name,movie_name,flag,time)
    time=time[0][0]
    time = time.strftime('%Y-%m-%d %H:%M:%S')
    print(time)
    if (suggest.objects.filter(movie_name=movie_name,user_name=user_name).count())==0:
        suggest.objects.create(user_name=user_name,movie_name=movie_name,flag=flag,time=time)
    if (suggest.objects.filter(user_name=user_name,movie_name=movie_name,flag=flag,time=time).count())==1:
        return HttpResponse("ok")
    else:
        return HttpResponse("error")

def search(request):
    movie_name = request.GET.get('movie_name','')
    print(movie_name)
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="*****",port=3306,db='movie')
        print("mysql连接成功")
    except:
        print("mysql连接失败")
    cursor = db.cursor()
    cursor.execute("select * from movies where 电影名称=%s",escape_string(movie_name))
    datas = cursor.fetchall()
    return JsonResponse(datas,json_dumps_params={'ensure_ascii': False}, safe=False)

def select(request):
    type = request.GET.get('type','')
    print(type)      
    try:
        db = pymysql.connect(host="localhost",user='root',passwd="*****",port=3306,db='movie')
        print("mysql连接成功")
    except:
        print("mysql连接失败")
    cursor = db.cursor()
    sqls = "select 电影名称,超链接,照片链接,类型,评分 from movies where 类型 like '%"+type+"%'"
    cursor.execute(sqls)
    datas = cursor.fetchall()
    return JsonResponse(datas,json_dumps_params={'ensure_ascii': False}, safe=False)