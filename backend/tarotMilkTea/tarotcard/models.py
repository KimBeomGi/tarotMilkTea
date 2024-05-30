from django.db import models

# Create your models here.
# class Product(models.Model):
#     product_code = models.AutoField(primary_key=True)
#     product_name = models.CharField(null=False, max_length=100)
#     price = models.IntegerField(default=0)
#     description = models.TextField(null=False)
#     filename = models.CharField(null=True, blank=True, default="", max_length=500)
class TarotCard(models.Model):
    card_num = models.IntegerField(unique=True, null=False)  # 카드 고유 번호 (기본 키)
    card_name = models.CharField(max_length=100, unique=True, null=False)  # 카드 명칭 (고유)
    card_means = models.TextField(default="[]")  # 카드 의미 (리스트)
    card_url = models.URLField(max_length=255)  # 카드 이미지 URL