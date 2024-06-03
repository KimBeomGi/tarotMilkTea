from rest_framework import serializers
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain

# 카드 입력 Serializer
class TarotCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCard
        # fields = ('card_num', 'card_name', 'card_url')
        fields = '__all__'

# 카드 기본(정방향) 의미 입력 Serializer
class TarotCardForwardMeaningSerializer(serializers.ModelSerializer):
    # card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotCardForwardMeaning
        # fields = ('card_forward_mean', 'tarotcard')
        fields = '__all__'

# 카드 역방향 의미 입력 Serializer
class TarotCardReverseMeaningSerializer(serializers.ModelSerializer):
    # card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotCardReverseMeaning
        # fields = ('card_reverse_mean', 'tarotcard')
        fields = '__all__'

# 카드 수비학적 의미 입력 Serializer
class TarotNumerologyMeanSerializer(serializers.ModelSerializer):
    # card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotNumerologyMean
        # fields = ('numerology_mean', 'tarotcard')
        fields = '__all__'

# 카드 회화적 의미 입력 Serializer
class TarotPictureMeanSerializer(serializers.ModelSerializer):
    # card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotPictureMean
        # fields = ('picture_mean', 'tarotcard')
        fields = '__all__'

# 카드 설명 내용 입력 Serializer
class TarotMeanExplainSerializer(serializers.ModelSerializer):
    # card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotMeanExplain
        # fields = ('explain', 'tarotcard')
        fields = '__all__'