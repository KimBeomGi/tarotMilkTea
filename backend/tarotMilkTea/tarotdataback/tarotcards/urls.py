# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    # 영화 리뷰 게시판
    # path('tarotcard/', include('tarotcard.urls')),
    path('', views.tarot_means_list),
    path('gemini/', views.useGemini),
]