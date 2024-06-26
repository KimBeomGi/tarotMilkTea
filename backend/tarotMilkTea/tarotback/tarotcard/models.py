from django.db import models
from django.conf import settings
from accounts.models import User

# 타로카드 기본
class TarotCard(models.Model):
    card_num = models.IntegerField(unique=True, null=False) # 카드 고유 번호 (기본 키)
    card_name = models.CharField(max_length=100, unique=True, null=False)   # 카드 명칭 (고유)
    card_url = models.CharField(max_length=255)  # 카드 이미지 URL
    is_major = models.BooleanField(default=True)
    distinguish = models.IntegerField(null=False)
    # 0~4 major, pentacle, wand, cup, sword순

# 카드 기본(정방향) 의미
class TarotCardForwardMeaning(models.Model):
    card_forward_mean = models.CharField(max_length=255)
    tarotcard = models.ForeignKey(TarotCard, on_delete=models.CASCADE)

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


# 카드 결과
class TarotResult(models.Model):
    greeting = models.TextField()
    past = models.TextField()
    present = models.TextField()
    future = models.TextField()
    advice = models.TextField()
    conclusion = models.TextField()
    selected_cards = models.JSONField()
    selected_cards_name = models.JSONField()
    subject = models.CharField(max_length=255)
    consulValue = models.CharField(max_length=255)
    save_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    