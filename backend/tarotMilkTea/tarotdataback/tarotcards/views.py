from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotListSerializer, TarotCardMeaningSerializer, TarotCardSerializer
from .models import TarotCard, TarotCardMeaning

import pymongo
from pymongo import MongoClient

# 구글 gemini api이용
import os
import google.generativeai as genai
import json

# from bson import ObjectId
GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')

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
        request_data = request.data
        prompt = {}
        prompt["request_subject"] = request_data['subject']
        prompt["request_concern"] = request_data['concern']
        prompt["request_selectedCard"] = request_data['selectedCard']
        
        
        response_data = {
            "message": "타로 카드 API에서 POST 요청시 보내는 안녕하세요!",
            "datada" : request_data,
            "prompt" : prompt
        }
        
        return Response(response_data, status=status.HTTP_201_CREATED)
    
@api_view(["POST"])
def useGemini(request):
    if request.method == 'POST':
        request_data = request.data
        r_prompt = {}
        r_prompt["request_subject"] = request_data['subject']
        r_prompt["request_concern"] = request_data['concern']
        r_prompt["request_selectedCard"] = request_data['selectedCard']
        try:
            genai.configure(api_key=GOOGLE_API_KEY)
            model = genai.GenerativeModel(
                'gemini-1.5-flash',
                system_instruction="""
                    You are korean. Your name is GGAMNYANG. In Korean, it's "깜냥". And user name is "홍차". You never use MarkDown template.
                    You are an expert with knowledge of tarot cards.
                    It's kind, and it uses a soft tone.
                    It explains the tarot card selected by the client along with various modifiers and provides counseling and advice on your concerns.
                    In particular, it explains in great detail how the client should behave immediately. Your explanation is very specific and detailed with various modifiers.
                    Provide answers tailored to the client's questions.
                    The question form is as follows.
                    subject: 1 out of the following 5 (신년운, 애정운, 금전운, 직장운, 학업운, 오늘의 운세), concern: Client's Concerns, selectedCard: [Past Card, Present Card, Future Card, Advice Card 1, Advice Card 2]
                    The Your response of the answer is as follows.
                    The response object has the following schema.
                    1. greeting: Your greeting
                    2. past: Description of Past Card and Description of the past as a Past card
                    3. present: Description of Present Card and Description of the past as a Present card
                    4. future: Description of Future Card and Description of the past as a Future card
                    5. advice: Description of Advice Cards and Description of the past as a Advice card1 and Advice card2
                    6. conclusion: A conclusion based on all cards and an answer to Client's Concerns.
                    Each key's value must be at least 330 tokens long.
                    Explain each card in as much detail as possible.
                    You using this JSON schema:
                    {"greeting": str, "past":str, "present":str, "future":str, "advice":str, "conclusion":str}
                """
            )
            # user_prompt = """
            #     {"subject": "금전운",
            #     "concern": "내가 로또 1등에 당첨될 수 있을지 너무 궁금해!!! 알려줘!!!!",
            #     "selectedCard": [Page of Cups, The High Priestess, 7 of cups, Judgement, Two of Cups]}
            # """
            user_prompt = str(r_prompt)
            gemini_response = model.generate_content(
                user_prompt,
                generation_config={
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "top_k": 64,
                    "max_output_tokens": 8192,
                    "response_mime_type": "application/json",
                },
                safety_settings = [
                    {
                        "category": "HARM_CATEGORY_HARASSMENT",
                        "threshold": "BLOCK_ONLY_HIGH",
                    },
                    {
                        "category": "HARM_CATEGORY_HATE_SPEECH",
                        "threshold": "BLOCK_ONLY_HIGH",
                    },
                    {
                        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        "threshold": "BLOCK_ONLY_HIGH",
                    },
                    {
                        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                        "threshold": "BLOCK_ONLY_HIGH",
                    },
                ]
                # stream=True,
            )
            try:
                change_response = json.loads(gemini_response.text)
                # print(type(change_response))
                # print(change_response)
                gemini_answer = change_response
            except:
                gemini_answer = False

            # print(type(gemini_answer))
            # print(gemini_answer)
            response_data = {
                "message": "성공",
                "requestData": request_data,
                "answer" : gemini_answer,
            }
        except:
            response_data = {
                "message":"실패",
                "requestData": request_data,
                "answer" : False
            }
    return Response(response_data, status=status.HTTP_201_CREATED)


# client = MongoClient(uri)
# db = client["TMT"]
# collection = db["tarotcards_tarotcard"]
# mydoc = collection.find({"card_num":74},{"_id":0, "card_mean": 1})
# collection.find({}, {"_id":0, "id":1}).sort("id", -1).limit(1).next()
# collection.insert_one(mydict)

