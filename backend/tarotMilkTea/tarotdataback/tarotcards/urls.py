# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    # 타로 정보 url
    # path('tarotcard/', include('tarotcard.urls')),
    path('', views.tarot_list),    # 카드 목록(일반) 가져오기
    path('detail_list/', views.tarot_detail_list),    # 카드 목록(상세) 가져오기
    path('major_list/', views.tarot_major_list),    # 카드 목록(메이저 상세) 가져오기
    path('minor_list/', views.tarot_minor_list),    # 카드 목록(마이너 상세) 가져오기
    # path('detail/<int:tarot_num>', views.tarot_detail),    # 카드 세부(상세) 가져오기
    path('detail/<int:tarot_num>', views.tarot_detail, name='tarot_detail'),
    path('forward/', views.tarot_forward),    # 카드 정방향 의미 기입
    path('reverse/', views.tarot_reverse),    # 카드 역방향 의미 기입
    path('numeric/', views.tarot_numeric),    # 카드 수비학적 의미 기입
    path('picture/', views.tarot_picture),    # 카드 회화적 의미 기입
    path('explain/', views.tarot_explain),    # 카드 설명 의미 기입
    path('gemini/', views.useGemini),   # Gemini API 호출
]