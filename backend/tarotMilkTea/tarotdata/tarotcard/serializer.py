from rest_framework import serializers
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain

# 카드 입력 Serializer
class TarotCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCard
        fields = '__all__'

# 카드 기본(정방향) 의미 입력 Serializer
class TarotCardForwardMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCardForwardMeaning
        fields = '__all__'

# 카드 역방향 의미 입력 Serializer
class TarotCardReverseMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCardReverseMeaning
        fields = '__all__'

# 카드 수비학적 의미 입력 Serializer
class TarotNumerologyMeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotNumerologyMean
        fields = '__all__'

# 카드 회화적 의미 입력 Serializer
class TarotPictureMeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotPictureMean
        fields = '__all__'

# 카드 설명 내용 입력 Serializer
class TarotMeanExplainSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotMeanExplain
        fields = '__all__'