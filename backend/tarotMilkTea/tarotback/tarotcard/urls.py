from django.urls import path
from . import views

urlpatterns = [
    # 타로 정보 url
    # path('tarotcard/', include('tarotcard.urls')),
    # 데이터 가져오기
    
    # 데이터 기입
    path('addtarot/', views.addtarot, name='addtarot'),    # 타로 카드 추가 기입
    # path('forward/', views.tarot_forward, name='tarot_forward'),    # 카드 정방향 의미 기입
]