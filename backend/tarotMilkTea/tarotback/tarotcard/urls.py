from django.urls import path
from . import views

urlpatterns = [
    # 타로 정보 url
    # path('tarotcard/', include('tarotcard.urls')),
    # 데이터 가져오기
    path('', views.tarot_list, name='tarot_list'),    # 카드 목록(일반) 가져오기
    path('detail_list/', views.tarot_detail_list, name='tarot_detail_list'),    # 카드 목록(상세) 가져오기
    path('major_list/', views.tarot_major_list, name='tarot_major_list'),    # 카드 목록(메이저 상세) 가져오기
    path('minor_list/', views.tarot_minor_list, name='tarot_minor_list'),    # 카드 목록(마이너 상세) 가져오기
    path('detail/<int:tarot_num>/', views.tarot_detail, name='tarot_detail'),   # 카드 세부(상세) 가져오기
    
    # 데이터 기입
    path('addtarot/', views.addtarot, name='addtarot'),    # 타로 카드 추가 기입
    path('forward/', views.tarot_forward, name='tarot_forward'),    # 카드 정방향 의미 기입
    path('reverse/', views.tarot_reverse, name='tarot_reverse'),    # 카드 역방향 의미 기입
    path('numeric/', views.tarot_numeric, name='tarot_numeric'),    # 카드 수비학적 의미 기입
    path('picture/', views.tarot_picture, name='tarot_picture'),    # 카드 회화적 의미 기입
    path('explain/', views.tarot_explain, name='tarot_explain'),    # 카드 설명 의미 기입
 
    # 유저가 뽑은 카드 점 기록
    path('save_result/', views.tarot_save_result, name='tarot_save_result'),    # 카드 점 기록
    path('tarot_result/list/', views.tarot_result_list, name='tarot_result_list'),    # 유저의 타로결과 목록 가져오기
    path('tarot_result/<int:result_id>/', views.tarot_result_list, name='tarot_result_list'),    # 유저의 타로결과 1개 가져오기

    
    # gemini_api
    path('gemini/', views.useGemini, name='useGemini'),   # Gemini API 호출
]