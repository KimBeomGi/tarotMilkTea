from django.db import models
from django.conf import settings

class TarotCard(models.Model):
    card_num = models.IntegerField(unique=True, null=False) # 카드 고유 번호 (기본 키)
    card_name = models.CharField(max_length=100, unique=True, null=False)   # 카드 명칭 (고유)
    card_url = models.CharField(max_length=255)  # 카드 이미지 URL

class TarotCardMeaning(models.Model):
    card_mean = models.CharField(max_length=255)
    # card_num = models.IntegerField(null=False)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

    @property
    def card_num(self):
        return self.tarotcard.card_num