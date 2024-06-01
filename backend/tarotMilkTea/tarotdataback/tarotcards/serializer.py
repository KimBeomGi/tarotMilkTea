from rest_framework import serializers
from .models import TarotCard, TarotCardMeaning

class TarotCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCard
        fields = ('card_num', 'card_name', 'card_url')

class TarotCardMeaningSerializer(serializers.ModelSerializer):
    card_num = serializers.IntegerField(source='tarotcard.card_num', read_only=True)
    class Meta:
        model = TarotCardMeaning
        fields = ('card_mean', 'card_num')

class TarotListSerializer(serializers.ModelSerializer):
    card_means_list = serializers.SerializerMethodField()

    class Meta:
        model = TarotCard
        fields = ('card_num', 'card_name', 'card_url', 'card_means_list')

    def get_card_means_list(self, obj):
        meanings = TarotCardMeaning.objects.filter(tarotcard=obj)
        return [meaning.card_mean for meaning in meanings]