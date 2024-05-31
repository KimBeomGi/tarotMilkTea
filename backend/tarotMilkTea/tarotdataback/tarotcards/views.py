from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotListSerializer
from .models import TarotCard, TarotCardMeaning

import pymongo
from pymongo import MongoClient
# from bson import ObjectId

# # Create your views here.

uri ="mongodb+srv://beomDB:<password>@beomcluster.y79inxq.mongodb.net/?retryWrites=true&w=majority&appName=beomCluster"

try: 
    client = MongoClient(uri)
    print("MongoDB에 성공적으로 연결되었습니다!!!")
    db = client["TMT"]
    print("database에 접속되었습니다.")
except:   
    print("MongoDB에 연결할 수 없습니다.") 

@api_view(["GET", "POST"])
def tarot_means_list(request):
    # 요청 처리 논리 (예: 데이터베이스에서 데이터 가져오기)
    if request.method == 'GET':
        # cards = TarotCard.objects.all().order_by('-id')
        # serializer = TarotListSerializer(cards, many=True)
        data = {"message": "타로 카드 API에서 GET요청시 보내는 안녕하세요!"}

        collection = db["tarotcards_tarotcard"]
        last_document = collection.find().sort("id", -1).limit(1).next()
        if last_document:
            del last_document['_id']  # _id 필드 제거
            print(f"가장 마지막으로 삽입된 문서 (ID 제외): {last_document}")


        return Response(data)
        # return Response(serializer.data)
        

    elif request.method == 'POST':
        # data = {"message": "타로 카드 API에서 POST요청시 보내는 안녕하세요!"}
        # db = conn.TMT
        # collection = db.tarotcards_tarotcard
        collection = db["tarotcards_tarotcard"]
        print("databse table에 접속되었습니다.")
        
        request_data = request.data
        new_card = {
            "card_num": int(request_data['num']),
            "card_name": request_data['name'],
            "card_url": request_data['url'],
            "id": int(request_data['id']),
        }
        try:
            print('되라')
            collection.insert_one(new_card)
            print('데이터 기입에 성공했습니다.')
        except:
            print('데이터 기입에 실패했습니다.')

        response_data = {
            "message": "타로 카드 API에서 POST 요청시 보내는 안녕하세요!",
            "data": {
                "card_num": new_card['card_num'],
                "card_name": new_card['card_name'],
                "card_url": new_card['card_url'],
            }
        }
        return Response(response_data, status=status.HTTP_201_CREATED)