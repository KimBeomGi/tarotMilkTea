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
# 카드 기본(정방향) 의미 가져오기 Serializer
class GETTarotCardForwardMeaningSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    tarotcard_id = serializers.SerializerMethodField()

    class Meta:
        model = TarotCardForwardMeaning
        fields = ('_id', 'card_forward_mean', 'tarotcard_id')
    
    def get__id(self, obj):
        return str(obj._id)
    
    def get_tarotcard_id(self, obj):
        return str(obj.tarotcard._id)

# 카드 역방향 의미 입력 Serializer
class TarotCardReverseMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCardReverseMeaning
        fields = '__all__'
# 카드 역방향 의미 가져오기 Serializer
class GETTarotCardReverseMeaningSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    tarotcard_id = serializers.SerializerMethodField()
    class Meta:
        model = TarotCardReverseMeaning
        fields = ('_id', 'card_reverse_mean', 'tarotcard_id')

    def get__id(self, obj):
        return str(obj._id)
    
    def get_tarotcard_id(self, obj):
        return str(obj.tarotcard._id)

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



# 카드 목록(일반) 가져오기###############################################
class TarotGeneralListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCard
        fields = ['card_num', 'card_name', 'card_url', 'is_major', 'distinguish']

#########################################################################

# 카드 목록(상세) 가져오기################################################
# TarotCardForwardMeaning 모델을 위한 Serializer
# class FMeanDetailListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TarotCardForwardMeaning
#         fields = ['card_forward_mean']

# # TarotCardReverseMeaning 모델을 위한 Serializer
# class RMeanDetailListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TarotCardReverseMeaning
#         fields = ['card_reverse_mean']

# TarotCard 모델을 위한 Serializer
class TarotDetailListSerializer(serializers.ModelSerializer):
    card_means = serializers.SerializerMethodField()
    card_r_means = serializers.SerializerMethodField()

    class Meta:
        model = TarotCard
        fields = ['card_num', 'card_name', 'card_url', 'is_major', 'distinguish', 'card_means', 'card_r_means']

    # 정방향 의미 가져오기
    def get_card_means(self, obj):
        forward_meanings = TarotCardForwardMeaning.objects.filter(tarotcard=obj)
        # return FMeanDetailListSerializer(forward_meanings, many=True).data
        return [meaning.card_forward_mean for meaning in forward_meanings]

    # 역방향 의미 가져오기
    def get_card_r_means(self, obj):
        reverse_meanings = TarotCardReverseMeaning.objects.filter(tarotcard=obj)
        # return RMeanDetailListSerializer(reverse_meanings, many=True).data
        return [meaning.card_reverse_mean for meaning in reverse_meanings]
#########################################################################

# 카드 목록(메이저 상세) 가져오기################################################
class TarotMajorListSerializer(serializers.ModelSerializer):
    card_means = serializers.SerializerMethodField()
    card_r_means = serializers.SerializerMethodField()
    class Meta:
        model = TarotCard
        fields = ['card_num', 'card_name', 'card_url', 'is_major', 'distinguish', 'card_means', 'card_r_means']
    def get_card_means(self, obj):
        forward_meanings = TarotCardForwardMeaning.objects.filter(tarotcard=obj)
        return [meaning.card_forward_mean for meaning in forward_meanings]

    def get_card_r_means(self, obj):
        reverse_meanings = TarotCardReverseMeaning.objects.filter(tarotcard=obj)
        return [meaning.card_reverse_mean for meaning in reverse_meanings]
#########################################################################

# 카드 목록(마이너 상세) 가져오기##########################################
class TarotMinorListSerializer(serializers.ModelSerializer):
    card_means = serializers.SerializerMethodField()
    class Meta:
        model = TarotCard
        fields = ['card_num', 'card_name', 'card_url', 'is_major', 'distinguish', 'card_means']
    def get_card_means(self, obj):
        forward_meanings = TarotCardForwardMeaning.objects.filter(tarotcard=obj)
        return [meaning.card_forward_mean for meaning in forward_meanings]
#########################################################################

# 카드 세부(상세) 가져오기################################################
class TarotDetaliSerializer(serializers.ModelSerializer):
    numerology_means = serializers.SerializerMethodField()
    picture_means = serializers.SerializerMethodField()
    card_explain = serializers.SerializerMethodField()
    class Meta:
        model = TarotCard
        fields = ['card_num', 'card_name', 'card_url', 'is_major', 'distinguish', 'numerology_means', 'picture_means', 'card_explain']
    def get_numerology_means(self, obj):
        numerology_meanings = TarotNumerologyMean.objects.filter(tarotcard=obj)
        return [meaning.numerology_mean for meaning in numerology_meanings]
    def get_picture_means(self, obj):
        picture_meanings = TarotPictureMean.objects.filter(tarotcard=obj)
        return [meaning.picture_mean for meaning in picture_meanings]
    def get_card_explain(self, obj):
        card_explaindata = TarotMeanExplain.objects.filter(tarotcard=obj)
        return [explainD.explain for explainD in card_explaindata]
#########################################################################