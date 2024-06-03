from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TarotCardSerializer, TarotCardForwardMeaningSerializer, TarotCardReverseMeaningSerializer, GETTarotCardForwardMeaningSerializer
# 목록 serializer 
from .serializer import TarotGeneralListSerializer, TarotDetailListSerializer, TarotMajorListSerializer, TarotMinorListSerializer
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain

import pymongo
from pymongo import MongoClient
from bson import ObjectId
import json

# 구글 gemini api이용
import os
import google.generativeai as genai


# from bson import ObjectId
GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')

# 카드 목록(일반) 가져오기
@api_view(["GET"])
def tarot_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotGeneralListSerializer(cards, many=True)
        response_data = {
            "data":"GET 요청데이터",
            "test" : serializer.data
        }
        return Response(response_data)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

# 카드 목록(상세) 가져오기
@api_view(["GET"])
def tarot_detail_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotDetailListSerializer(cards, many=True)
        response_data = {
            "data":"GET 요청데이터",
            "test" : serializer.data
        }
        return Response(response_data)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

# 카드 목록(메이저 상세) 가져오기
@api_view(["GET"])
def tarot_major_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotMajorListSerializer(cards, many=True)
        response_data = {
            "data":"GET 요청데이터",
            "test" : serializer.data
        }
        return Response(response_data)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

# 카드 목록(마이너 상세) 가져오기
@api_view(["GET"])
def tarot_minor_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotMinorListSerializer(cards, many=True)
        response_data = {
            "data":"GET 요청데이터",
            "test" : serializer.data
        }
        return Response(response_data)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

# 카드 세부(상세) 가져오기
@api_view(["GET"])
def tarot_detail(request, tarot_num):
    if request.method =="GET":
        # tarot_num에 해당하는 카드 가져오기
        # card = TarotCard.objects.get(card_num=tarot_num)
        # serializer = TarotCardSerializer(card)
        # card_mean = get_list_or_404(TarotCardForwardMeaning, tarotcard_id=5)
        # serializer = TarotCardForwardMeaningSerializer(card_mean, many=True)
        
        response_data = {
            "data":"GET 요청데이터",
            # "tarot_card" : serializer.data,
        }
    #     return Response(response_data)
    # elif request.method =="POST":
    #     response_data = {
    #         "data":"POST 요청데이터"
    #     }
    #     return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)


card_forward_means_data = [
    "모험, 무지(無知)", "창조, 수완", "지식, 총명", "풍양, 모성", "책임, 부성(父性)", "가르침, 관대함", "연애, 쾌락", "전진, 승리", "힘, 용기", "탐색, 사려깊음", "기회, 일시적인 행운",
    "균형, 정당함", "자기희생, 인내", "격변, 이별", "조화, 견실", "사심, 속박, 타락", "파괴, 파멸", "희망, 동경", "불안, 애매함, 혼돈", "밝은 미래, 만족", "부활, 개선", "완성, 완전",
    "완전한 만족, 돈", "명람함, 문서에 의한 뉴스·메세지", "기예, 거래", "소유의 보정, 집착", "물질적인 트러블", "성공, 선물", "금전, 사업", "장인 기질, 준비", "물질적인 풍요, 달성", "이익, 재산", "정려근면, 학생", "유용, 재산", "부, 관대", "실제적인 지성, 사업",
    "창조력, 출발", "재산, 장엄함", "확립된 힘, 교역", "작업의 완성, 휴식", "치열한 경쟁, 스포츠", "승리자, 대뉴스의 도달", "용기, 토론", "활동성, 재빠름", "억압된 상황에서의 강함", "억압, 너무 많은 재산", "젊은 남성, 충실", "출발, 친숙한 젊은이", "친숙한, 정적", "정직, 양심적",
    "기쁨, 만족", "사랑, 우정", "풍족함, 행복", "권태, 포식", "손실, 별거 아닌 유산", "과거를 돌이켜봄, 행복", "환상, 약간의 성공", "성공의 방치, 겸손", "물질적 안녕, 만족", "만족, 가정", "학도, 숙고", "도착, 발전", "선량한, 행복", "공정한, 창조적 지성",
    "힘의 승리, 권력", "균형, 조건부 조화", "후퇴, 단절", "은둔, 회복", "타락, 폐지", "작업을 끝마침, 중개자", "기획, 계획", "구속된 힘, 비난", "실망, 환멸", "황폐, 고통", "감시, 경계", "용감함, 격노", "결단력 있는, 미망인", "재판관, 정의",
]

# 카드 정방향 의미 기입
@api_view(["GET","POST", "PUT"])
def tarot_forward(request):
    if request.method =="GET":
        try:
            cardmean = TarotCardForwardMeaning.objects.get(card_forward_mean="모험")
            serializer = GETTarotCardForwardMeaningSerializer(cardmean)
            # data = {"tarotcard_id" : str(cardmean.tarotcard_id)}
            return Response(serializer.data, status=status.HTTP_200_CREATED)
        except Exception as e:
            response_data = {
                "message": e
            }
            return Response(response_data)

    if request.method =="POST":
        response_data = []
        # TarotCardForwardMeaning.objects.all().delete()
        for i in range(len(card_forward_means_data)):
            tarot_card = TarotCard.objects.get(card_num = i)
            card_means = card_forward_means_data[i].split(', ')
            for j in range(len(card_means)):
                card_f_m = card_means[j]
                data = {
                    'card_forward_mean' : card_f_m,
                    'tarotcard': tarot_card._id  # ObjectId를 str로 변환해주면 읽을수 있음
                }
                serializer = TarotCardForwardMeaningSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response_data, status=status.HTTP_201_CREATED)

    elif request.method == "PUT":
        response_data = {
            "data":"PUT 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

card_reverse_means_data =[
    "경솔, 어리석음", "겁많음, 기만", "잔혹, 무례함", "과잉, 허영", "오만, 존대", "협량, 나태", "질투, 배신, 실연", "폭주, 좌절, 패배", "본성, 자만", "음습, 폐쇄적, 탐욕",
    "오산, 불운", "불균형, 편견", "무의미한 희생, 맹목", "변화의 유보, 고착", "낭비, 불안정", "악순환으로부터의 각성", "필요로 하는 파괴", "환멸, 비애", "불안 해소, 명료함", "연기(延期), 실패",
    "재기불능, 후회", "미완성, 어중간함",
]

# 카드 역방향 의미 기입
@api_view(["POST", "PUT"])
def tarot_reverse(request):
    if request.method =="POST":
        response_data = []
        TarotCardReverseMeaning.objects.all().delete()
        for i in range(len(card_reverse_means_data)):
            tarot_card = TarotCard.objects.get(card_num = i)
            card_means = card_reverse_means_data[i].split(', ')
            for j in range(len(card_means)):
                card_r_m = card_means[j]
                data = {
                    'card_reverse_mean' : card_r_m,
                    'tarotcard': tarot_card._id
                }
                serializer = TarotCardReverseMeaningSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(tarot_card._id)
        return Response(response_data, status=status.HTTP_201_CREATED)
    elif request.method =="PUT":
        response_data = {
            "data":"PUT 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

tarot_numeric_means = [
    "", "", "", "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "",
]

# 카드 수비학적 의미 기입
@api_view(["POST", "PUT"])
def tarot_numeric(request):
    if request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
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

# 카드 회화적 의미 기입
@api_view(["POST", "PUT"])
def tarot_picture(request):
    if request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
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

# 카드 설명 의미 기입
@api_view(["POST", "PUT"])
def tarot_explain(request):
    if request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
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


@api_view(["GET"])
def tarot_card_list(request):
    if request.method == 'GET':
        # cards = TarotCard.objects.all()
        # serializer = TarotBaseListSerializer(cards, many=True)
        # TarotCardForwardMeaning.objects.all().delete()
        response_data = {
            # "cards" : serializer.data
            "data":"데이타를 지웠습니다."
        }
        return Response(response_data)

@api_view(["POST"])
def addmean(request):
    if request.method == "POST":
        try:
            response_data = {
                "message" : "입력완료"
            }
        except:
            response_data = {
                "message" : "입력실패"
            }
        return Response(response_data)

@api_view(["GET", "POST"])
def tarot_means_list(request):
    # 요청 처리 논리 (예: 데이터베이스에서 데이터 가져오기)
    if request.method == 'GET':
        # cards = TarotCardForwardMeaning.objects.all()
        # serializer = TarotCardForwardMeaningSerializer(cards, many=True)
        try:
            response_data = {
                "message": "타로 카드 API에서 GET 요청 시 모든 데이터를 입력했습니다..",
                # "dadadada" : serializer.data
            }
        except Exception as e:
            response_data = {
                "message": "TarotCardForwardMeaning 데이터를 입력하지 못했습니다."
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


# gemini api 활용한 사용자 고민에 대한 답변 제공
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
                "gemini_answer" : gemini_answer,
            }
        except:
            response_data = {
                "message":"실패",
                "requestData": request_data,
                "gemini_answer" : False
            }
    return Response(response_data, status=status.HTTP_201_CREATED)


# client = MongoClient(uri)
# db = client["TMT"]
# collection = db["tarotcards_tarotcard"]
# mydoc = collection.find({"card_num":74},{"_id":0, "card_mean": 1})
# collection.find({}, {"_id":0, "id":1}).sort("id", -1).limit(1).next()
# collection.insert_one(mydict)


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
        tarto_cards = TarotCard.objects.all()
        # tarto_cards = TarotCard.objects.get(card_num = 21)
        serializer = TarotCardSerializer(tarto_cards, many=True)
        # serializer = TarotCardSerializer(tarto_cards)
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
            try:
                data = {
                    "card_num" : card_num,
                    "card_name" : card_name,
                    "card_url" : card_url
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