from json import JSONDecodeError
import os, json
import random
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

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

# BASE_URL = 'http://127.0.0.1:8000/'
# GOOGLE 소셜로그인
state = os.environ.get("STATE")
# GOOGLE_CALLBACK_URI = BASE_URL + 'accounts/google/callback/'
GOOGLE_CALLBACK_URI = 'http://127.0.0.1:3000/social/google'
## 1번
# def google_login(request):
#     scope = "https://www.googleapis.com/auth/userinfo.email"
#     client_id = os.environ.get("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
#     return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")
#######

@api_view(['GET','POST'])
# @permission_classes([AllowAny])
def google_callback(request):
    if request.method == 'POST':
        print('request.data=-==',request.data)
        client_id = os.environ.get("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
        client_secret = os.environ.get("SOCIAL_AUTH_GOOGLE_SECRET")
    
        # 사용자의 구글 코드
        # code = request.GET.get('code')
        code = request.data.get('code')
        print('코드===', code)

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
            # return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
        
        ### 2-2. 성공 시 이메일 가져오기
        email_req_json = email_req.json()
        email = email_req_json.get('email')
        user_id = email_req_json.get('user_id')
        print('email_req ===', email_req)
        print('email_req.json() ===', email_req.json())
        print('email_req_status ===', email_req_status)
        print('user_id ===', user_id)

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
                    'profile_image_url' : user.profile_image_url
                }
            }
            print('response_data1====', response_data)
            return Response(response_data, status=status.HTTP_202_ACCEPTED)
            # return JsonResponse(response_data, status=status.HTTP_202_ACCEPTED)


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
                print('저장성공')
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
                        'profile_image_url' : user.profile_image_url
                    }
                }

                print('response_data2====', response_data)

                return Response(response_data, status=status.HTTP_201_CREATED)
                # return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
            except:
                response_data = {
                    'message': '저장실패'
                }
                print('response_data3====', response_data)
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
                # return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
    response_data = {
        'message': '실패'
    }
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def kakao_login(reqeust):
    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    redirect_uri = os.environ.get("SOCIAL_AUTH_KAKAO_REDIRECT_URI")
    # 시도해보자
    try:
        reqeust_data = reqeust.data
        # request에서 code 꺼내기
        code = reqeust_data.get("code")
        # 카카오에서  토큰 받아오기
        kakao_token_response = requests.post(
            'https://kauth.kakao.com/oauth/token',
            headers={"Content-type": "application/x-www-form-urlencoded;charset=utf-8"},
            data={
                "grant_type": "authorization_code",
                "client_id": client_id,
                "redirect_uri": redirect_uri,
                "code": code
            }
        )
        access_token = kakao_token_response.json().get("access_token")  
        # 카카오에서 정보 받아오기
        kakao_user = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        )
        print("kakao_user:", kakao_user)
        kakao_user = kakao_user.json()
        
        kakao_account = kakao_user.get("kakao_account")
        # social = "kakao"
        social_id = kakao_user.get("id")
        email = kakao_account.get("email")
        nickname = kakao_account["profile"]["nickname"]
        profile_image_url = kakao_account["profile"]["profile_image_url"]
        print("kakao_account:", kakao_account)
        print("social_id", social_id)
        print("email", email)
        print("nickname", nickname)
        print("profile_image_url", profile_image_url)
        # user데이터가 있으면 token과 데이터 가져오기
        try:
            user = User.objects.get(email=email, social='kakao')
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
                    'profile_image_url' : user.profile_image_url
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)
        # user데이터가 없으면 생성하고 token 가져오기
        except User.DoesNotExist:
            # 닉네임이 없으면 닉네임을 설정
            if not nickname:
                nickname = f"{random.choice(nickname_a)}{random.choice(nickname_b)}{random.randint(1000, 9999)}"
            data = {
                'email' : email,
                'username' : email + str(random.randint(100000, 1000000)),
                'nickname' : nickname,
                'social' : 'kakao',
                'social_id' : str(social_id),
                'profile_image_url' : profile_image_url
            }
            try:
                # user 생성
                user = User.objects.create(
                    email=data.get("email"),
                    username=data.get("username"),
                    nickname=data.get("nickname"),
                    social=data.get("social"),
                    social_id=data.get("social_id"),
                    profile_image_url=data.get("profile_image_url")
                )
                user.set_unusable_password()    # 소셜로그인이니까 No password!
                user.save() # user 저장
                print('저장성공')
                # user 꺼내기                
                user = User.objects.get(username=data.username, social=data.social, email=email)
                refresh_token = RefreshToken.for_user(user) # 자체 jwt 발급

                response_data = {
                    'refresh': str(refresh_token),
                    'access': str(refresh_token.access_token),
                    'message': '저장성공',
                    'userInfo' : {
                        'nickname' : user.nickname,
                        'social' :user.social,
                        'email' : user.email,
                        'profile_image_url' : user.profile_image_url
                    }
                }

                return Response(response_data, status=status.HTTP_201_CREATED)
            except:
                response_data = {
                    'message': '저장실패'
                }
                return Response(status=status.HTTP_400_BAD_REQUEST)
    # 이게 안되네...
    except:
        response_data = {
            'message': '실패'
        }
        return Response(status=status.HTTP_400_BAD_REQUEST)



# 회원 로그아웃
# 사실 기능은 없다.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method=="POST":
        try:
            response_data = {
                'message' : '로그아웃 성공'
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except:
            response_data = {
                'message' : '로그아웃 실패'
            }
            return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def test1(reqeust):
    try:
        print(reqeust.data)
        return Response(reqeust.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
        