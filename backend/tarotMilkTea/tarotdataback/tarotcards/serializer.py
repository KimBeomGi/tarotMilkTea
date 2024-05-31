from rest_framework import serializers
from .models import TarotCard, TarotCardMeaning

class TarotCardMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCardMeaning
        fields = ('card_mean', 'card_num')

class TarotListSerializer(serializers.ModelSerializer):
    card_means_list = serializers.SerializerMethodField()

    class Meta:
        model = TarotCard
        fields = ('card_num', 'card_name', 'card_url', 'card_means_list')

    def get_card_means_list(self, obj):
        meanings = TarotCardMeaning.objects.filter(card_num=obj)
        return TarotCardMeaningSerializer(meanings, many=True).data