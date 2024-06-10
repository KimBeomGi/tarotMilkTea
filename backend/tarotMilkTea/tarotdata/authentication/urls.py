from django.urls import path
from . import views
urlpatterns = [
    # 타로 정보 url
    # path('users/', include('authentication.urls')),
    path('kakao/login/', views.kakao_login, name='kakao_login'),    # 카카오 로그인
    path('kakao/logout/', views.kakao_logout, name='kakao_logout'), # 카카오 로그아웃
    path('github/login/', views.github_login, name='github_login'), # 깃허브 로그인
    # path('github/logout/', views.github_logout, name='github_logout'), # 깃허브 로그아웃
]