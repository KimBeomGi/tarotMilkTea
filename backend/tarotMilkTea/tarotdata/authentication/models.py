import jwt
import datetime
from djongo import models
from django.conf import settings

# 시크릿 키와 알고리즘 설정
JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 5183999  # 토큰 유효 시간 (초)

# 장고 auth.user를 상속받지 않은 완전히 새로운 user
class CustomUser(models.Model):
    _id = models.ObjectIdField()
    email = models.EmailField(unique=True)
    nickname = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    profile_url = models.URLField(null=True, blank=True)
    is_admin = models.BooleanField(null=False, default=False)
    provider = models.CharField(max_length=50, null=False)
    
    def __str__(self):
        return self.email
    
    def generate_jwt_token(self):
        payload = {
            'user_id': str(self.pk),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    @staticmethod
    def social_login(email, provider):
        try:
            user = CustomUser.objects.get(email=email, provider=provider)
            return user.generate_jwt_token()
        except CustomUser.DoesNotExist:
            # # 없으면 사용자 생성
            # user = CustomUser(email=email, provider=provider)
            # user.save()
            # return user.generate_jwt_token()
            return None

    @staticmethod
    def logout(token):
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            # 블랙리스트에 추가하는 등의 로직을 구현할 수 있습니다.
            return True
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False
