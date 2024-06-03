# from django.db import models
# from django.conf import settings
from djongo import models
from bson import ObjectId

# 타로카드 기본
class TarotCard(models.Model):
    _id = models.ObjectIdField()
    card_num = models.IntegerField(unique=True, null=False) # 카드 고유 번호 (기본 키)
    card_name = models.CharField(max_length=100, unique=True, null=False)   # 카드 명칭 (고유)
    card_url = models.CharField(max_length=255)  # 카드 이미지 URL

# 카드 기본(정방향) 의미
class TarotCardForwardMeaning(models.Model):
    _id = models.ObjectIdField()
    card_forward_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

# 카드 역방향 의미
class TarotCardReverseMeaning(models.Model):
    _id = models.ObjectIdField()
    card_reverse_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

# 카드 수비학적의미
class TarotNumerologyMean(models.Model):
    _id = models.ObjectIdField()
    numerology_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)
    
# 카드 회화적의미
class TarotPictureMean(models.Model):
    _id = models.ObjectIdField()
    picture_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)    

# 카드 설명
class TarotMeanExplain(models.Model):
    _id = models.ObjectIdField()
    explain = models.TextField()
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)