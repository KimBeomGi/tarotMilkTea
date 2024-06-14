from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotCardSerializer, TarotCardForwardMeaningSerializer, TarotCardReverseMeaningSerializer, GETTarotCardForwardMeaningSerializer, TarotNumerologyMeanSerializer, TarotPictureMeanSerializer, TarotMeanExplainSerializer
# 목록 및 세부 가져오기 serializer 
from .serializer import TarotGeneralListSerializer, TarotDetailListSerializer, TarotMajorListSerializer, TarotMinorListSerializer, TarotDetaliSerializer
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain
import json

# 구글 gemini api이용
import os
import google.generativeai as genai

GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')

##########################################################################
# TarotCard에 데이터 기입
tarots = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", "Wheel of Fortune",
    "Justice", "The Hanged Man", "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World",
    "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles", "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles",
    "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands", "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
    "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups", "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords", "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords", "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
]

# 카드 추가
@api_view(["GET","POST", "PUT"])
def addtarot(request):
    if request.method == "GET":
        tarto_cards = get_list_or_404(TarotCard)
        serializer = TarotCardSerializer(tarto_cards, many=True)
        return Response(serializer.data)
    if request.method =="POST":
        # TarotCard.objects.get(card_num = 21).delete()
        response_data = []
        tmp_o = 0
        tmp_x = 0
        for i in range(len(tarots)):
            card_num = i
            card_name = tarots[i]
            card_url = f"https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard{card_num}.jpg"
            
            if i <= 21:
                is_major = True
                distinguish = 0
            elif 22 <= i < 36:
                is_major = False
                distinguish = 1
            elif 36 <= i < 50:
                is_major = False
                distinguish = 2
            elif 50 <= i < 64:
                is_major = False
                distinguish = 3
            elif 64 <= i < 78:
                is_major = False
                distinguish = 4
            try:
                data = {
                    "card_num" : card_num,
                    "card_name" : card_name,
                    "card_url" : card_url,
                    "is_major" : is_major,
                    "distinguish" : distinguish
                }
                serializer = TarotCardSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                tmp_o += 1
                print(card_name, '저장됨', tmp_o)
                
            except:
                tmp_x += 1
                print(card_name, '실패함', tmp_x)

        return Response(response_data)
    elif request.method =="PUT":
        response_data = {
            "data":"PUT 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

########################################################################