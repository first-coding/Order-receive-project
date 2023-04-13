from django.urls import path
from . import views


urlpatterns = [
    path('ShowData', views.ShowData, name='ShowData'),
    path('Suggest',views.Suggest,name="Suggest"),
    path('Insert',views.Insert,name="insert"),
    path('Get_cookie',views.get_cookie,name="get_cookie"),
    path('Search',views.search,name="search"),
]