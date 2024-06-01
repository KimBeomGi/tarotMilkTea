from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotListSerializer, TarotCardMeaningSerializer, TarotCardSerializer
from .models import TarotCard, TarotCardMeaning

import pymongo
from pymongo import MongoClient
# from bson import ObjectId

# # Create your views here.
# uri ="mongodb+srv://beomDB:<password>@beomcluster.y79inxq.mongodb.net/?retryWrites=true&w=majority&appName=beomCluster"

# try: 
#     client = MongoClient(uri)
#     print("MongoDB에 성공적으로 연결되었습니다!!!")
#     db = client["TMT"]
#     print("database에 접속되었습니다.")
# except:   
#     print("MongoDB에 연결할 수 없습니다.") 

@api_view(["GET", "POST"])
def tarot_means_list(request):
    # 요청 처리 논리 (예: 데이터베이스에서 데이터 가져오기)
    if request.method == 'GET':
        # serializer = TarotListSerializer(cards, many=True)
        cards = TarotCardMeaning.objects.all()
        serializer = TarotCardMeaningSerializer(cards, many=True)
        print(serializer.data)
        return Response(serializer.data)
        # data = {"message": "타로 카드 API에서 GET요청시 보내는 안녕하세요!"}
        try:
            response_data = {
                "message": "타로 카드 API에서 GET 요청 시 모든 데이터를 입력했습니다.."
            }
        except Exception as e:
            response_data = {
                "message": "TarotCardMeaning 데이터를 입력하지 못했습니다."
            }
        return Response(response_data)
        # return Response(serializer.data)
        

    elif request.method == 'POST':
        # collection = db["tarotcards_tarotcardmeaning"]
        # print("databse table에 접속되었습니다.")
        
        # request_data = request.data
        # try:
        #     for i in range(len(card_means_data)):
        #         card_means = card_means_data[i].split(", ")
        #         tarotcard = get_object_or_404(TarotCard, card_num=i)
        #         for j in range(len(card_means)):
        #             mean_data = {
        #                 "card_mean": card_means[j]
        #             }
        #             serializer = TarotCardMeaningSerializer(data=mean_data)
        #             if serializer.is_valid(raise_exception=True):
        #                 serializer.save(tarotcard=tarotcard)
        # except:
        #     pass

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