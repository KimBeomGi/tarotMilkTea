from django.urls import path
from . import views

urlpatterns = [
    # 타로 정보 url
    # path('tarotcard/', include('tarotcard.urls')),
    # 데이터 가져오기
    
    # 데이터 기입
    path('addtarot/', views.addtarot, name='addtarot'),    # 타로 카드 추가 기입
    path('forward/', views.tarot_forward, name='tarot_forward'),    # 카드 정방향 의미 기입
    path('reverse/', views.tarot_reverse, name='tarot_reverse'),    # 카드 역방향 의미 기입
    path('numeric/', views.tarot_numeric, name='tarot_numeric'),    # 카드 수비학적 의미 기입
    path('picture/', views.tarot_picture, name='tarot_picture'),    # 카드 회화적 의미 기입
    path('explain/', views.tarot_explain, name='tarot_explain'),    # 카드 설명 의미 기입
]