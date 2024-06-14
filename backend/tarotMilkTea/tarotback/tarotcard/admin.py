from django.contrib import admin
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain

# Register your models here.
admin.site.register(TarotCard)
admin.site.register(TarotCardForwardMeaning)
admin.site.register(TarotCardReverseMeaning)
admin.site.register(TarotNumerologyMean)
admin.site.register(TarotPictureMean)
admin.site.register(TarotMeanExplain)