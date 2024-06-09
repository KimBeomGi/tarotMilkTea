from django.urls import path
from . import views
urlpatterns = [
    # 타로 정보 url
    # path('users/', include('authentication.urls')),
    path('kakao/', views.kakao_login, name='kakao_login'),    # 카드 목록(일반) 가져오기
]