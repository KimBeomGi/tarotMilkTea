from rest_framework import serializers
from .models import User
# user정보 가져오기

# 회원가입
class RegistUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'