from django.shortcuts import get_list_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import CustomUser
import os

GOOGLE_API_KEY = os.environ.get('GOOGLE_MY_API_KEY')
KAKAO_CLIENT_ID = os.environ.get('KAKAO_CLIENT_ID')
KAKAO_REDIRECT_URI = os.environ.get('KAKAO_REDIRECT_URI')
GITHUB_CLIENT_ID = os.environ.get('GITHUB_CLIENT_ID')
GITHUB_REDIRECT_URI = os.environ.get('GITHUB_REDIRECT_URI')
GITHUB_ClIENT_SECRETS = os.environ.get('GITHUB_ClIENT_SECRETS')

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
        # print('############')
        # print(user_data)
        kakao_account = user_data.get("kakao_account")
        profile = kakao_account.get("profile")
        nickname = profile.get("nickname")
        profile_image_url = profile.get("profile_image_url")
        email = kakao_account.get("email")
        # print('$$$$$$$$$$$$$$$$')
        # print(nickname, profile_image_url, email)
        
        # token 검증하기
        # token_validate_response = requests.get(
        #     'https://kapi.kakao.com/v1/user/access_token_info',
        #     headers = {
        #         "Authorization" : f"Bearer ${ACCESS_TOKEN}"
        #     }
        # )

        # ACCESS_TOKEN을 user에게 보내고 유저가 가지고 있게하자.
        # User 테이블에 기록 및 꺼내오기
        try:
            user = CustomUser.objects.get(email=kakao_account.get("email"), provider='kakao')
            # tmt로그인
            tmt_ACCESS_TOKEN =  user.social_login(email, 'kakao')
            response_data = {
                "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN,
                "kakao_ACCESS_TOKEN" : ACCESS_TOKEN,
                "nickname" : user.nickname,
                "profile_url" : user.profile_url,
                "email" : user.email,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create(
                email=kakao_account.get("email"),
                nickname=profile.get("nickname"),
                username=profile.get("nickname"),
                profile_url=profile.get("profile_image_url"),
                provider='kakao',
            )
            # user.set_unusable_password()    # 소셜로그인(kakao로그인)이므로 password는 없어도 되게.
            user.save()
            # tmt로그인
            tmt_ACCESS_TOKEN = user.social_login(email, 'kakao')
            response_data = {
                "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN,
                "kakao_ACCESS_TOKEN" : ACCESS_TOKEN,
                "nickname" : user.nickname,
                "profile_url" : user.profile_url,
                "email" : user.email,
            }
            return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# 카카오 로그아웃
@api_view(["POST"])
def kakao_logout(request):
    request_data = request.data
    kakao_ACCESS_TOKEN = request_data.get("kakao_ACCESS_TOKEN")
    tmt_ACCESS_TOKEN = request_data.get("tmt_ACCESS_TOKEN")
    try:
        logout_response = requests.post(
            "https://kapi.kakao.com/v1/user/logout",
            headers={
                "Authorization" : f"Bearer {kakao_ACCESS_TOKEN}",
                "Content-type" : "application/x-www-form-urlencoded;charset=utf-8",
            }
        )
        # print(logout_response.json())
        # 카카오 계정과 함께 로그아웃
        requests.get(
            f"https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_REDIRECT_URI}"
        )
        # tmt 로그아웃
        CustomUser.logout(tmt_ACCESS_TOKEN)

        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
def github_login(request):
    try:
        request_data = request.data
        code = request_data.get('code')
        # github_token = requests.post(
        #     "https://github.com/login/oauth/access_token",
        #     headers={"Content-type" : "application/x-www-form-urlencoded;charset=utf-8"},
        #     data={
        #         "grant_type" : "authorization_code",
        #         "client_id" : "221d623259d71cea5558153346f2e81e",
        #         "redirect_uri" : "http://127.0.0.1:3000/social/kakao",
        #         "code" : code,
        #         # "client_secret":토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드,
        #     }
        # )
        github_token = requests.post(
            f"https://github.com/login/oauth/access_token?code={code}&client_id={GITHUB_CLIENT_ID}&client_secret={GITHUB_ClIENT_SECRETS}&redirect_uri={GITHUB_REDIRECT_URI}",
            headers={"Accept": "application/json"},
        )
        print("github_token.json()", github_token.json())
        ACCESS_TOKEN = github_token.json().get("access_token")
        user_data = requests.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {ACCESS_TOKEN}",
                "Accept": "application/json",
            },
        )
        user_data = user_data.json()
        print("user_data:", user_data)
        # email가져오기
        user_emails = requests.get(
            "https://api.github.com/user/emails",
            headers={
                "Authorization": f"Bearer {ACCESS_TOKEN}",
                "Accept": "application/json",
            },
        )
        user_emails = user_emails.json()
        print("user_emails:", user_emails)


        # print('############')
        # print(user_data)
            # kakao_account = user_data.get("kakao_account")
            # profile = kakao_account.get("profile")
            # nickname = profile.get("nickname")
            # profile_image_url = profile.get("profile_image_url")
            # email = kakao_account.get("email")
        # print('$$$$$$$$$$$$$$$$')
        # print(nickname, profile_image_url, email)
        
        # token 검증하기
        # token_validate_response = requests.get(
        #     'https://kapi.kakao.com/v1/user/access_token_info',
        #     headers = {
        #         "Authorization" : f"Bearer ${ACCESS_TOKEN}"
        #     }
        # )



        # print(user_emails[0].get("email"))
        # print(user_data.get("name"))
        # print(user_data.get("login"))
        # print(user_data.get("avatar_url"))
        email = user_emails[0].get("email")
        nickname = user_data.get("login")
        profile_url =user_data.get("avatar_url")

        # ACCESS_TOKEN을 user에게 보내고 유저가 가지고 있게하자.
        # User 테이블에 기록 및 꺼내오기
        try:
            user = CustomUser.objects.get(email=user_emails[0].get("email"), provider='github')
            # tmt로그인
            tmt_ACCESS_TOKEN =  user.social_login(email, 'github')
            response_data = {
                "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN,
                "github_ACCESS_TOKEN" : ACCESS_TOKEN,
                "nickname" : user.nickname,
                "profile_url" : user.profile_url,
                "email" : user.email,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create(
                email=email,
                nickname=nickname,
                username=nickname,
                profile_url=profile_url,
                provider='github',
            )
            # user.set_unusable_password()    # 소셜로그인(kakao로그인)이므로 password는 없어도 되게.
            user.save()
            # tmt로그인
            tmt_ACCESS_TOKEN = user.social_login(email, 'github')
            response_data = {
                "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN,
                "github_ACCESS_TOKEN" : ACCESS_TOKEN,
                "nickname" : user.nickname,
                "profile_url" : user.profile_url,
                "email" : user.email,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 깃허브 로그아웃
@api_view(["POST"])
def github_logout(request):
    request_data = request.data
    github_ACCESS_TOKEN = request_data.get("github_ACCESS_TOKEN")
    tmt_ACCESS_TOKEN = request_data.get("tmt_ACCESS_TOKEN")
    try:
        # logout_response = requests.post(
        #     "https://kapi.kakao.com/v1/user/logout",
        #     headers={
        #         "Authorization" : f"Bearer {kakao_ACCESS_TOKEN}",
        #         "Content-type" : "application/x-www-form-urlencoded;charset=utf-8",
        #     }
        # )
        # # print(logout_response.json())
        # # 카카오 계정과 함께 로그아웃
        # requests.get(
        #     f"https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_REDIRECT_URI}"
        # )
        # tmt 로그아웃
        CustomUser.logout(tmt_ACCESS_TOKEN)

        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)