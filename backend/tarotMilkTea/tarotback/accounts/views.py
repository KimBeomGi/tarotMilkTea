from json import JSONDecodeError
import os, json
import random
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .serializer import RegistUserSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from accounts.models import User
from allauth.socialaccount.models import SocialAccount

# 닉네임 생성시
nickname_a = ["엉망진창", "웃고있는", "슬퍼하는", "놀라는", "무서워하는", "공포에떠는"]
nickname_b = ["홍차", "녹차", "보이차", "우롱차", "밀크티", "커피", "맥주", "소주", "막걸리", "청주", "와인", "위스키"]
nickname_c = 1029

BASE_URL = 'http://127.0.0.1:8000/'
# GOOGLE 소셜로그인
state = os.environ.get("STATE")
# BASE_URL = 'http://localhost:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'accounts/google/callback/'

## 1번
def google_login(request):
    scope = "https://www.googleapis.com/auth/userinfo.email"
    # client_id = os.environ.get("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    client_id = os.environ.get("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")
#######

def google_callback(request):
    client_id = os.environ.get("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    client_secret = os.environ.get("SOCIAL_AUTH_GOOGLE_SECRET")
    # 사용자의 구글 코드
    code = request.GET.get('code')
    print('코드', code)

    # 1. 받은 코드로 구글에 access token 요청
    token_req = requests.post(
        f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}&state={state}")
    
    ### 1-1. json으로 변환 & 에러 부분 파싱
    token_req_json = token_req.json()
    error = token_req_json.get("error")

    print(token_req)
    print(token_req_json)
    ### 1-2. 에러 발생 시 종료
    if error is not None:
        raise JSONDecodeError(error)

    ### 1-3. 성공 시 access_token 가져오기
    access_token = token_req_json.get('access_token')

    #################################################################

    # 2. 가져온 access_token으로 이메일값을 구글에 요청
    email_req = requests.get(f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")
    email_req_status = email_req.status_code
    
    ### 2-1. 에러 발생 시 400 에러 반환
    if email_req_status != 200:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    
    ### 2-2. 성공 시 이메일 가져오기
    email_req_json = email_req.json()
    email = email_req_json.get('email')
    user_id = email_req_json.get('user_id')
    print('email_req ===', email_req)
    print('email_req.json() ===', email_req.json())
    print('email_req_status ===', email_req_status)
    print('user_id ===', user_id)   #str 108772299355437599908

    print('이건 작동함')
    # return JsonResponse({'access': access_token, 'email':email})

    # 유저 여부 확인 후 있으면 로그인, 없으면 회원가입 후 로그인
    # db를 social에 국한 하지 말고 완전히 따로따로 만들자.
    try:
        user = User.objects.get(email=email, social='google')
        refresh_token = RefreshToken.for_user(user) # jwt발급
        response_data =  {
            'refresh': str(refresh_token),
            'access': str(refresh_token.access_token),
            # 'email': email,
            'message': '가져오기 성공',
            'userInfo' : {
                'nickname' : user.nickname,
                'social' :user.social,
                'email' : user.email,
                'profile_url' : user.profile_image_url
            }
        }
        print('response_data====', response_data)
        # return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)


    except User.DoesNotExist:
        nickname = f"{random.choice(nickname_a)}{random.choice(nickname_b)}{random.randint(1000, 9999)}"
        data = {
            'email' : email,
            'username' : email + str(random.randint(100000, 1000000)),
            'nickname' : nickname,
            'social' : 'google',
            'social_id' : str(user_id),
        }
        try:
            user = User.objects.create(
                email=data.get("email"),
                username=data.get("username"),
                nickname=data.get("nickname"),
                social=data.get("social"),
                social_id=data.get("social_id")
            )
            user.set_unusable_password()    # 소셜로그인이니까 No password!
            user.save()

            user = User.objects.get(username=data.username, social=data.social, email=email)
            refresh_token = RefreshToken.for_user(user)         # 자체 jwt 발급    

            response_data = {
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token),
                'message': '저장성공',
                'userInfo' : {
                    'nickname' : user.nickname,
                    'social' :user.social,
                    'email' : user.email,
                    'profile_url' : user.profile_image_url
                }
            }

            print('response_data====', response_data)

            # return Response(response_data, status=status.HTTP_201_CREATED)
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
        except:
            response_data = {
                'message': '저장실패'
            }
            print('response_data====', response_data)
            # return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
# 회원가입은 email과 입력받은 이름으로 진행 
def registerUser(request):
    # body = json.loads(request.body.decode('utf-8'))
    # email = body['email']
    # name = body['name']
    if request.method =='POST':
        request_data = request.data
        print('request_data===', request_data)
        email = request_data["email"]
        username = request_data["username"]
        social = request_data["social"]
        nickname = request_data["nickname"]

        if nickname == "":
            nickname = f"{random.choice(nickname_a)}{random.choice(nickname_b)}{random.randint(1000, 9999)}"
            request_data["nickname"] = nickname
        if email == "" or username == "":
            response_data = {
                'message' : '유저 데이터(이메일, 아이디)가 없습니다.'
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        
        # user 생성
        serializer = RegistUserSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=username, social=social, email=email)
            refresh_token = RefreshToken.for_user(user)         # 자체 jwt 발급    

            response_data = {
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        # 생성실패
        else:
            response_data = {
                'message' : 'cannot create user'
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


# Creating tokens manually

# from rest_framework_simplejwt.tokens import RefreshToken
# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }