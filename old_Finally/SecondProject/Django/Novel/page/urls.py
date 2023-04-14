from django.urls import path
from . import views

urlpatterns = [
    path('enter',views.enter,name="enter"),
    path('sign',views.sign,name="sign"),
    path('recommand',views.recommand,name='recommand'),
]