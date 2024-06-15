from rest_framework import serializers
from .models import User
# user정보 가져오기

# 회원가입
class RegistUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
# 유저 정보 가져오기
class getUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nickname', 'profile_image_url', 'social']
        # fields = '__all__'
        # exclude = ['id', 'password','social_id']