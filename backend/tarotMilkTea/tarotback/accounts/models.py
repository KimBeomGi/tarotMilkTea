import random
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=20, default="")
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    birthday = models.DateField(auto_now=False, auto_now_add=True)
    profile_image_url = models.CharField(max_length=200, default="https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tmtbaseprofile.png")
    followings = models.ManyToManyField("self", symmetrical=False, related_name='followers')
    social = models.CharField(max_length=100, default="base")
    

    def clean(self):
        super().clean()
        if not self.nickname: 
            a = ["엉망진창", "웃고있는", "슬퍼하는", "놀라는", "무서워하는", "공포에떠는"]
            b = ["홍차", "녹차", "보이차", "우롱차", "밀크티", "커피", "맥주", "소주", "막걸리", "청주", "와인", "위스키"]
            c = random.randint(1000, 9999)
            self.nickname = f"{random.choice(a)}{random.choice(b)}{c}"
