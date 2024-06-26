from django.urls import include, path
from . import views

urlpatterns = [
    # path('accounts/', include('accounts.urls'))
    path('dj-rest-auth/', include('dj_rest_auth.urls')), # dj_rest_auth
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),    #dj_rest_auth Registration (선택사항)

    # 소셜로그인
    # 구글 소셜로그인
    # path('google/login/', views.google_login, name='google_login'),
    path('google/callback/', views.google_callback, name='google_callback'),
    # path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    # path('google/login/finish/', views.GoogleLogin.as_view(), name='google_login_todjango'),
    # 카카오 소셜로그인
    path('kakao/login/', views.kakao_login, name='kakao_login'),
    # 깃허브 소셜로그인
    path('github/login/', views.github_login, name='github_login'),


    path('regist/', views.registerUser, name='account_register'),
    path('logout/', views.user_logout, name='account_logout'),
    path('test1/', views.test1, name='test1'),
    path('find_user/', views.find_user, name='find_user'),
    path('getout_user/', views.getout_user, name='getout_user'),

]
