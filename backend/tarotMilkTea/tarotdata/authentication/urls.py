from django.urls import path
from . import views
urlpatterns = [
    # 타로 정보 url
    # path('users/', include('authentication.urls')),
    path('kakao/login/', views.kakao_login, name='kakao_login'),    # 카카오 로그인
    path('kakao/logout/', views.kakao_logout, name='kakao_logout'), # 카카오 로그아웃
]
