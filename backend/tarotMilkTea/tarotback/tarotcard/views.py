from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication   # 발급한 토큰으로 유저찾기
from .serializer import TarotCardSerializer, TarotCardForwardMeaningSerializer, TarotCardReverseMeaningSerializer, GETTarotCardForwardMeaningSerializer, TarotNumerologyMeanSerializer, TarotPictureMeanSerializer, TarotMeanExplainSerializer
# 목록 및 세부 가져오기 serializer 
from .serializer import TarotGeneralListSerializer, TarotDetailListSerializer, TarotMajorListSerializer, TarotMinorListSerializer, TarotDetaliSerializer, TarotResultSerializer, TarotResultListSerializer, TarotResultDetailSerializer 
from .models import TarotCard, TarotCardForwardMeaning, TarotCardReverseMeaning, TarotNumerologyMean, TarotPictureMean, TarotMeanExplain, TarotResult
from accounts.models import User
import json



# 구글 gemini api이용
import os
import google.generativeai as genai

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
tarot_picture_means = [
    '시작, 순수, 자유, 모험, 무지, 잠재력', '능력, 집중, 기술, 창조, 의지, 자원', '지혜, 직관, 비밀, 무의식, 신비, 영감', '풍요, 창조, 자연, 모성, 번영, 풍성함', '권위, 안정, 구조, 통제, 책임, 질서', '전통, 지식, 교훈, 지도, 영성, 신앙', '사랑, 조화, 연합, 선택, 조화, 매력', '승리, 의지, 통제, 여정, 결단력, 성취', '용기, 인내, 힘, 자제, 결단력, 내면의 힘', '고독, 탐구, 지혜, 자아성찰, 명상, 은둔', ' 운명, 변화, 기회, 행운, 순환, 예측 불가',
    '정의, 균형, 진실, 책임, 공평, 판단', '희생, 관점, 멈춤, 인내, 수용, 통찰', '변화, 종말, 변형, 재생, 해방, 전환', '조화, 균형, 인내, 치유, 절제, 융합', '유혹, 속박, 물질주의, 중독, 위험, 집착', '파괴, 충격, 변화, 해체, 해방, 재건', '희망, 영감, 평화, 치유, 재생, 신뢰', '환상, 직관, 혼란, 꿈, 무의식, 두려움', '행복, 성공, 명확성, 활력, 희망, 기쁨', '부활, 심판, 변화, 각성, 계몽, 재평가', '완성, 통합, 성취, 여정, 조화, 충족감',
    '풍요, 기회, 성장, 안정, 번영, 재물', '균형, 적응, 관리, 조화, 변화, 유연성', '협력, 팀워크, 성취, 기술, 노력, 성장', '안정, 보호, 소유, 유지, 보안, 집착', '궁핍, 어려움, 손실, 고립, 도전, 희망', '나눔, 기부, 균형, 후원, 이타심, 공평', '평가, 기다림, 노력, 성찰, 인내, 결과', '노력, 집중, 숙련, 헌신, 성장, 연습', '성취, 독립, 자립, 풍요, 안락, 만족', '유산, 가족, 안정, 부, 전통, 안전', '배움, 탐구, 기회, 성장, 잠재력, 실험', '책임, 신뢰, 노력, 인내, 실용성, 헌신', '실용성, 보호, 풍요, 돌봄, 안정, 현실적', '부, 안정, 권위, 성공, 책임, 실용성',
    '창조, 기회, 열정, 동기부여, 새로운 시작, 힘', '계획, 결정, 발견, 개인적 목표, 미래 비전, 파트너십', '진전, 확장, 탐험, 기대, 비전, 기회', '축하, 안정, 공동체, 행복, 성취, 보안', '경쟁, 갈등, 도전,  다양성, 동력, 장애물', '승리, 인정, 진행, 명성, 성공, 자부심', '방어, 결단력, 도전에 맞서기, 용기, 지위, 우위', '진행, 느낌의 변화, 행동, 빠른 움직임, 결정, 소식', '인내, 지구력, 결심, 준비, 방어, 경 계', '부담, 과로, 스트레스, 책임, 짐, 과도한 압박', '탐구, 발견, 열정, 메시지, 호기심, 새로운 아이디어', '모험, 에너지, 용기, 열정, 무모함, 여행', '자신감, 열정, 결단력, 독립, 사교성, 매력', '리더십, 비전, 사회적 영향력, 용기, 정열, 도전',
    '감정의 흐름, 사랑, 새로운 관계, 감정적 충만함, 영적 풍요, 창조성', '유대, 결합, 파트너십, 상호 작용, 조화, 균형', '축하, 친교, 우정, 공동체, 행복, 풍요', '무관심, 재평가, 자아 성찰, 내면화, 기회 불 만족, 안주', '실망, 손실, 회한, 변화에 대한 저항, 슬픔, 회복의 가능성', '추억, 과거로의 회귀, 순수, 낭만, 기쁜 재회, 보호', '환상, 선택, 기회, 환상에 빠짐, 결정 지연, 망상', '탐색, 변화 추구, 자아 발 견, 포기, 내면의 여정, 진실 탐구', '만족, 행복, 원하는 것을 얻음, 만족감, 성취, 감사', '행복한 가정, 완성, 조화로운 관계, 정서적 안정, 지속적인 행복, 소속감', '호기심, 창의력, 영감, 감정적 개시, 직관, 영적 메시지', '로맨스, 모험, 예술가의 마음, 이상주의, 우아함, 여정', '공감, 이해심, 통찰력, 직관, 치유, 정서적 안정성', '정서적 통제, 공감, 균형, 자비, 외교, 리더십',
    '명확성, 진실, 결단력, 지식, 새로운 시작, 정신력', '결정, 균형, 갈등, 교착 상태, 내적 갈등, 이성적 사고', '고통, 상심, 배신, 슬픔, 이별, 치유', '휴식, 회복, 명상, 내적 평화, 휴식, 회복', '갈등, 패배, 배신, 자존심, 상처, 교훈', '이동, 변화, 회복, 새로운 시작, 희망, 구원', '속임수, 계략, 전략, 책략, 비밀, 탈출', '제한, 속박, 무기력, 두려움, 억압, 자기 제한', '불안, 걱정, 고민, 악몽, 고통, 스트레스', '배신, 끝, 파괴, 절망, 비극, 새로운 시작', '호기심, 지성, 탐구, 진실 추구, 신속한 사고, 소식', '결단력, 행동력, 용기, 진실, 야망, 추진력', '지혜, 독립, 객관성, 공정성, 이성, 통찰력', '권위, 지식, 논리, 결단력, 진실, 지도력',
]

# 카드 회화적 의미 기입
@api_view(["POST", "PUT"])
def tarot_picture(request):
    if request.method =="POST":
        response_data = []
        for i in range(len(tarot_picture_means)):
            tarot_card = TarotCard.objects.get(card_num = i)
            card_means = tarot_picture_means[i].split(', ')
            for j in range(len(card_means)):
                card_p_m = card_means[j]
                data = {
                    "picture_mean" : card_p_m,
                    "tarotcard" : tarot_card.id
                }
                serializer = TarotPictureMeanSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(card_p_m)
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
#TarotMeanExplainSerializer 데이터 기입
# json 파일의 경로를 설정
json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cardExplain.json')

# 파일을 열고 내용을 읽기;.
with open(json_path, 'r', encoding='utf-8') as f:
    explain_data = json.load(f)

explainD = explain_data["cards"]

# 카드 설명 의미 기입
@api_view(["POST", "PUT"])
def tarot_explain(request):
    if request.method =="POST":
        response_data = []
        for i in range(len(explainD)):
            tarot_card = TarotCard.objects.get(card_num = i)
            explain = explainD[i]
            for j in range(len(explain)):
                explain[j]
                data={
                    "explain" : explain[j],
                    "tarotcard" : tarot_card.id
                }
                serializer = TarotMeanExplainSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    print(str(tarot_card.id))
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(tarot_card.id)
            response_data.append(tarot_card.id)
        return Response(response_data, status=status.HTTP_201_CREATED)
        # request_data = request.data
        # card_num = request_data.card_num

        # tarotcard = TarotCard.objects.get(card_num=card_num)
        # data = {
        #     "explain" : '0',
        #     "tarotcard" : tarotcard.id
        # }
        # serializer = TarotMeanExplainSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        #     response_data = {
        #         "message" : "성공"
        #     }
        #     return Response(response_data)
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method =="PUT":
        response_data = {
            "data":"PUT 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

########################################################################################
# gemini-api 연동
GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')
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

########################################################################################
# 카드 목록(일반) 가져오기
@api_view(["GET"])
def tarot_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotGeneralListSerializer(cards, many=True)
        # response_data = {
        #     "data":"GET 요청데이터",
        #     "test" : serializer.data
        # }
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)
########################################################################################
# 카드 목록(상세) 가져오기
@api_view(["GET"])
def tarot_detail_list(request):
    if request.method =="GET":
        cards = get_list_or_404(TarotCard)
        serializer = TarotDetailListSerializer(cards, many=True)
        # response_data = {
        #     "data":"GET 요청데이터",
        #     "test" : serializer.data
        # }
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)
##############################################################################
# 카드 목록(메이저 상세) 가져오기
@api_view(["GET"])
def tarot_major_list(request):
    if request.method =="GET":
        try:
        # mongoDB의 데이터 저장 방식으로 인해 djongo에서 boolean type은 문제를 일으킴
        # 따라서 is_major = True 가 아닌 is_major__in=[True]를 사용해야함.
            cards = get_list_or_404(TarotCard, is_major = True)
            serializer = TarotMajorListSerializer(cards, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)
################################################################################
# 카드 목록(마이너 상세) 가져오기
@api_view(["GET"])
def tarot_minor_list(request):
    if request.method =="GET":
        try:
            cards = get_list_or_404(TarotCard, is_major__in=[False])
            serializer = TarotMinorListSerializer(cards, many=True)
            return Response(serializer.data)
        except Exception as e:
            Response({"error": str(e)}, status=500)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)
################################################################################
# 카드 세부(상세) 가져오기
@api_view(["GET"])
def tarot_detail(request, tarot_num):
    if request.method =="GET":
        try:
            # tarot_num에 해당하는 카드 가져오기
            card = TarotCard.objects.get(card_num=tarot_num)
            serializer = TarotDetaliSerializer(card)
            return Response(serializer.data)
        except Exception as e:
            Response({"error": str(e)}, status=500)
        
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

#############################################################################
# 타로 카드를 저장 하면서 유저에게 기록
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tarot_save_result(request):
    try:
        # request_data = request.data
        request_data = request.data["sendData"]
        # print(request_data)
        # print(request_data.geminiAnswer)
        # print(request_data.selectedCards)

        # 토큰으로 유저 정보 가져오기
        jwt_auth = JWTAuthentication()
        user, tokenObject = jwt_auth.authenticate(request)
        # user_data = {
        #     'id' : user.id,
        #     'email' : user.email,
        #     'profile_image_url' : user.profile_image_url,
        #     'social' : user.social,
        #     'social_id' : user.social_id
        # }

        geminiAnswer = request_data["geminiAnswer"]
        selectedCards = request_data["selectedCards"]
        selectedCardsName = request_data["selectedCardsName"]
        subject = request_data["subject"]
        consulValue = request_data["consulValue"]
        data = {
            "greeting" : geminiAnswer["greeting"],
            "past" : geminiAnswer["past"],
            "present" : geminiAnswer["present"],
            "future" : geminiAnswer["future"],
            "advice" : geminiAnswer["advice"],
            "conclusion" : geminiAnswer["conclusion"],
            "selected_cards" : selectedCards,
            "selected_cards_name" : selectedCardsName,
            "subject" : subject,
            "consulValue" : consulValue,
            "user": user.id
        }
        print(user.id, user.email)
        print('되나1')
        serializer = TarotResultSerializer(data=data)
        print('되나2')
        if serializer.is_valid():
            print('되나3')
            serializer.save()
            print('되나4')
            return Response(status=status.HTTP_200_OK)
        else:
            print('안되나...')
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # print(data)
        # return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#############################################################################
# 유저에게 저장된 타로결과 리스트 가져오기
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tarot_result_list(request):
    try:
        # # 토큰으로 유저 정보 가져오기
        jwt_auth = JWTAuthentication()
        user, tokenObject = jwt_auth.authenticate(request)
        # user = User.objects.get(id=3)
        results = TarotResult.objects.filter(user=user)
        
        
        response_data = {
            "user_id" : user.id,
            "user_nickname" : user.nickname,
            "user_email" : user.email,
            # "results": TarotResultSerializer(results, many=True).data
            "results": TarotResultListSerializer(results, many=True).data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

#############################################################################
# 유저에게 저장된 타로결과 1개 가져오기
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tarot_result_list(request, result_id):
    try:
        # # 토큰으로 유저 정보 가져오기
        # jwt_auth = JWTAuthentication()
        # user, tokenObject = jwt_auth.authenticate(request)
        # user = User.objects.get(id=3)
        result = TarotResult.objects.get(id=result_id)
        # TarotResultListSerializer
        response_data = {
            "result" : TarotResultDetailSerializer(result).data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)