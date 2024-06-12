from django.urls import include, path
from . import views

urlpatterns = [
    # path('accounts/', include('accounts.urls'))
    path('dj-rest-auth/', include('dj_rest_auth.urls')), # dj_rest_auth
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),    #dj_rest_auth Registration (선택사항)

    # 소셜로그인
    # 구글 소셜로그인
    # path('google/login/', views.google_login, name='google_login'),
    # path('google/callback/', views.google_callback, name='google_callback'),
    # path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    # path('google/login/finish/', views.GoogleLogin.as_view(), name='google_login_todjango'),
    path('regist/', views.registerUser, name='account_register')
]
