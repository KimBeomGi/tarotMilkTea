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
# TarotCardForwardMeaning에 데이터 기입
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
                    'tarotcard': tarot_card.id
                }
                serializer = TarotCardForwardMeaningSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    # response_data.append(serializer.data)
                    response_data.append(card_f_m)
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

############################################################################
# TarotCardReverseMeaning에 데이터 기입
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
                    'tarotcard': tarot_card.id
                }
                serializer = TarotCardReverseMeaningSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    # response_data.append(serializer.data)
                    response_data.append(card_r_m)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
###############################################################################
#TarotNumerologyMean에 데이터 기입
tarot_numeric_means = [
    "0, 무(無), 혼돈, 무질서, 무한", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 완전한, 양(陽), 빛", 
    "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성",
    "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)",
    "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)",
    "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)",
    "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)", "5, 변화, 진보, 팽창, 파괴, 의식 상승", "6, 통합, 재편, 지혜, 사랑, 재정립, 연합", "7, 조화, 균형, 정도, 중용, 이중성", "8, 유지, 영속, 힘, 강한 모성", "9, 종말, 이상, 득도, 승화", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "1, 시작, 탄생, 유(有), 근원, 중심, 양(陽), 신, 완전함, 남자, 선, 빛", "2, 분리, 결합, 음(陽), 악마, 여자, 악, 어둠, 이중성", "3, 기초, 안정, 최초의 완성, 상승 욕구, 정신, 남성성", "4, 질서, 통제, 물질, 육체, 대지, 여성성(모성)",
]

# 카드 수비학적 의미 기입
@api_view(["POST", "PUT"])
def tarot_numeric(request):
    if request.method =="POST":
        response_data = []
        for i in range(len(tarot_numeric_means)):
            tarot_card = TarotCard.objects.get(card_num = i)
            card_means = tarot_numeric_means[i].split(', ')
            for j in range(len(card_means)):
                card_n_m = card_means[j]
                data = {
                    "numerology_mean" : card_n_m,
                    "tarotcard" : tarot_card.id
                }
                serializer = TarotNumerologyMeanSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(card_n_m)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(tarot_card.id)
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
###############################################################################
#TarotPictureMean 데이터 기입
