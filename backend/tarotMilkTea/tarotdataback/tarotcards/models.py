from django.db import models
from django.conf import settings

# 타로카드 기본
class TarotCard(models.Model):
    card_num = models.IntegerField(unique=True, null=False) # 카드 고유 번호 (기본 키)
    card_name = models.CharField(max_length=100, unique=True, null=False)   # 카드 명칭 (고유)
    card_url = models.CharField(max_length=255)  # 카드 이미지 URL

# 카드 정방향 의미
class TarotCardMeaning(models.Model):
    card_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

    # @property
    # def card_num(self):
    #     return self.tarotcard.card_num

# 카드 역방향 의미
class TarotCardReverseMeaning(models.Model):
    card_reverse_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

# 카드 수비학적의미
class TarotNumerologyMean(models.Model):
    numerology_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)
    
# 카드 회화적의미
class TarotPictureMean(models.Model):
    picture_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)    

# 카드 설명
class TarotMeanExplain(models.Model):
    explain = models.TextField()
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)