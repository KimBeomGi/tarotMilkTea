from django.shortcuts import get_list_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests


import os

GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')
KAKAO_CLIENT_ID = os.environ.get('KAKAO_CLIENT_ID')
KAKA_REDIRECT_URI = os.environ.get('KAKA_REDIRECT_URI')


# Create your views here.
@api_view(["GET","POST"])
def kakao_login(request):
    if request.method =="GET":
        response_data = {
            "data":"GET 요청데이터",
            "test" : 'test데이터'
        }
        return Response(response_data, status=status.HTTP_200_OK)
    elif request.method =="POST":
        response_data = {
            "data":"POST 요청데이터"
        }
        return Response(response_data)
    response_data = {
        "data":"비관리 메서드데이터"
    }
    return Response(response_data)

# from django.contrib.auth import login

# def my_login_view(request):
#     user = authenticate(request, username='john', password='secret')
#     if user is not None:
#         login(request, user)
#         return HttpResponse("로그인 성공")
#     else:
#         return HttpResponse("로그인 실패")

@api_view(["POST"])
def kakao_login(request):
    try:
        request_data = request.data
        code = request_data.get('code')
        kakao_token = requests.post(
            "https://kauth.kakao.com/oauth/token",
            headers={"Content-type" : "application/x-www-form-urlencoded;charset=utf-8"},
            data={
                "grant_type" : "authorization_code",
                "client_id" : "221d623259d71cea5558153346f2e81e",
                "redirect_uri" : "http://127.0.0.1:3000/social/kakao",
                "code" : code,
                # "client_secret":토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드,
            }
        )
        # print(kakao_token.json())
        ACCESS_TOKEN = kakao_token.json().get("access_token")
        user_data = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={
                "Authorization" : f"Bearer {ACCESS_TOKEN}",
                "Content-type" : "application/x-www-form-urlencoded;charset=utf-8",
            }

        )
        user_data = user_data.json()
        print('############')
        print(user_data)
        kakao_account = user_data.get("kakao_account")
        profile = kakao_account.get("profile")
        nickname = profile.get("nickname")
        profile_image_url = profile.get("profile_image_url")
        email = kakao_account.get("email")
        print('$$$$$$$$$$$$$$$$')
        print(nickname, profile_image_url, email)
        # User 테이블에 기록 및 꺼내오기
        # try:
        #     user = User.objects.get(email=kakao_account.get("email"))
        #     login(request, user)
        #     return Response(status=status.HTTP_200_OK)
        # except User.DoesNotExist:
        #     user = User.objects.create(
        #         email=kakao_account.get("email"),
        #         username=profile.get("nickname"),
        #         name=profile.get("nickname"),
        #         avatar=profile.get("profile_image_url"),
        #     )
        #     user.set_unusable_password()    # kakao로그인이니까 No password!
        #     user.save()
        #     login(request, user)
        #     return Response(status=status.HTTP_200_OK)
        
        return Response(request.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # try:
    #     code = request.data.get("code")  # 프론트에서 보내준 code로 token을 구해와야한다 !!
    #     access_token = requests.post(
    #         "https://kauth.kakao.com/oauth/token",
    #         headers={"Content-Type": "application/x-www-form-urlencoded"},
    #         data= {
    #             "grant_type": "authorization_code",
    #             "client_id": "kakao_login 클라이언트ID",  # 실제 앱의 client_id로 변경해야 합니다.
    #             "redirect_uri": "kakao_login의 redirect_rul" #"http://127.0.0.1:3000/social/kakao",
    #             "code": code
    #         },
    #     )
    #     access_token = access_token.json().get("access_token")
    #     # 성공 ! 그 다음에는 우린 token 이걸 가지고 kakao api와 대화가 가능하게 됐다 ! 즉 밑에서 user획득 가능
    #     user_data = requests.get(
    #         "https://kapi.kakao.com/v2/user/me",
    #         headers={
    #             "Authorization": f"Bearer {access_token}",
    #             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    #         },
    #     )
    #     user_data = user_data.json()
    #     kakao_account = user_data.get("kakao_account")
    #     profile = kakao_account.get("profile")
    #     try:
    #         user = User.objects.get(email=kakao_account.get("email"))
    #         login(request, user)
    #         return Response(status=status.HTTP_200_OK)
    #     except User.DoesNotExist:
    #         user = User.objects.create(
    #             email=kakao_account.get("email"),
    #             username=profile.get("nickname"),
    #             name=profile.get("nickname"),
    #             avatar=profile.get("profile_image_url"),
    #         )
    #         user.set_unusable_password()  # kakao로그인이니까 No password!
    #         user.save()
    #         login(request, user)
    #         return Response(status=status.HTTP_200_OK)
    # except Exception as e:
    #     return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)