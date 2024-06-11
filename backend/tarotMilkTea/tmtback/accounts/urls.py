from django.urls import include, path

urlpatterns = [
    # path('accounts/', include('accounts.urls'))
    path('dj-rest-auth/', include('dj_rest_auth.urls')), # dj_rest_auth
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))   #dj_rest_auth Registration (선택사항)
]
