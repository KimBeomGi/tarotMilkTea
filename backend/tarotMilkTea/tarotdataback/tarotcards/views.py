from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotListSerializer, TarotCardMeaningSerializer, TarotCardSerializer
from .models import TarotCard, TarotCardMeaning

import pymongo
from pymongo import MongoClient
# from bson import ObjectId

@api_view(["GET", "POST"])
def tarot_means_list(request):
    # 요청 처리 논리 (예: 데이터베이스에서 데이터 가져오기)
    if request.method == 'GET':
        # serializer = TarotListSerializer(cards, many=True)
        cards = TarotCardMeaning.objects.all()
        serializer = TarotCardMeaningSerializer(cards, many=True)
        try:
            response_data = {
                "message": "타로 카드 API에서 GET 요청 시 모든 데이터를 입력했습니다..",
                "dadadada" : serializer.data
            }
        except Exception as e:
            response_data = {
                "message": "TarotCardMeaning 데이터를 입력하지 못했습니다."
            }
        return Response(response_data)
        # return Response(serializer.data)
        

    elif request.method == 'POST':
        response_data = {
            "message": "타로 카드 API에서 POST 요청시 보내는 안녕하세요!",
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
# client = MongoClient(uri)
# db = client["TMT"]
# collection = db["tarotcards_tarotcard"]
# mydoc = collection.find({"card_num":74},{"_id":0, "card_mean": 1})
# collection.find({}, {"_id":0, "id":1}).sort("id", -1).limit(1).next()
# collection.insert_one(mydict)