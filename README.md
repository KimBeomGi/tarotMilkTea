# TAROT MILK TEA: AI 타로점 웹사이트

# ✒️개발 정보
개발 기간 : 2024.04.29.(월) ~ 2024.06.21(금) (총 8주)

개발 인원 : 1명

사이트 주소 : https://tarotmilkteakbg.site/
![스크린샷 2024-06-26 205623](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/a1672bd8-0195-4c25-a135-11b9d724113c)



# 목차
[💮기획 배경](#기획-배경)

[🃏주요 기능](#주요-기능)

[📈기술 스택](#기술-스택)

[🧩아키텍처](#아키텍처)

[📚ERD](#ERD)

[📁폴더 구조](#폴더-구조)

[📒회고](#회고)


# 💮기획 배경
1. 막막한 삶의 앞 날이 궁금한 당신에게 심리적 안정을 제공
   - 10~30 대 1,608명 대상 설문조사 결과 응답자의 90%가 운세를 본 경험이 있으며, 네이버 엑스퍼트 매출의 70%가 운세 및 사주 상담을 기록했습니다. 또한, 전체 응답자의 84.4%는 운세를 보는 것은 마음의 위안을 얻기 위해서라고 설명한 설문 조사가 있습니다.
저희는 마음의 위안을 얻고자 하는 당신에게 타로로나마 심리적인 안정을 제공하고자 합니다

3. 타로 상담사에 따른 들쑥날쑥한 타로 해석을 보완
    - 타로 상담사마다 타로의 해석이 다를 수 있습니다. tarotMilkTea는 지금까지 쌓여온 많은 타로 상담사의 다양한 관점을 종합하여 당신의 타로카드를 해석하고 상담해드리겠습니다.

3. 어디서든 간단하게 미래를 점쳐보기
    - tarotMilkTea는 어디서든 접근 가능한 웹 기반 서비스입니다. 어디서든 간편하게 타로 카드를 뽑아 당신의 미래를 확인해보세요.


# 🃏주요 기능
1. 운세보기 서비스
   1. 로그인이 되어있지 않으면, 소개란에서 로그인을 유도하도록 빨간색 텍스트로 표시합니다.![스크린샷 2024-06-26 205754](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/5050af03-5661-4da0-a81c-25707af4a8e1)

   2. 내담자가 고민 주제와 고민 내용을 입력할 수 있게합니다.![스크린샷 2024-06-26 210155](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/c9166153-43bb-4da9-b9fd-5b194a768bfb)

   3. 카드 섞기 버튼을 통해, 자신의 마음에 들 때까지 78장의 타로 중 30개의 카드를 고를 수 있게 합니다.![스크린샷 2024-06-26 210231](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/f01d5565-73e0-4a67-b03f-3150de840482)

   4. 5개의 카드를 선택한 후, 로그인이 되어있다면 운세보기 버튼을 클릭하여 자신이 뽑은 카드를 확인하고, AI의 답변을 대기합니다.![스크린샷 2024-06-26 210300](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/e2bbb3d5-987c-4898-8363-bf01aaa8055e)

   5. AI의 답변이 도착하면, 해당 답변을 확인합니다.![스크린샷 2024-06-26 210314](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/22866823-5019-4121-a3db-a513501e1b00)

   6. 확인 후 해당 질의응답 내용을 저장하고 싶다면, 저장하기 버튼을 눌러 저장합니다.![스크린샷 2024-06-26 210342](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/8a1eebe3-89db-4ca9-8d44-e8f139ccb5cf)

2. 소셜로그인 서비스
   1. 카카오 로그인, 깃허브 로그인, 구글 로그인 3가지의 소셜로그인을 통해 사용자가 불필요하게 추가적으로 아이디와 비밀번호를 기억하지 않아도 되도록 합니다.![스크린샷 2024-06-26 205833](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/7d57e677-48db-4ce9-93b8-968e7429b0f8)

   2. 우측 상단의 프로필 이미지 또는 닉네임을 클릭해서 마이페이지로 이동하며, 마이페이지 내에서 결과보관함으로 이동 및 로그아웃이 가능합니다.![스크린샷 2024-06-26 210841](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/2427fad3-e17f-4b85-911a-93f3ebb315d0)

3. 결과보관함 서비스
   1. 마이페이지 - 결과보관함을 클릭해서 이동하면, 내 타로 결과보관함으로 이동합니다.![스크린샷 2024-06-26 211114](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/f12b69d3-0eec-4ead-a111-9453c35131a4)

   2. 다시 보고 싶은 결과는 우측의 스크롤 이모티콘을 선택하고나 타로 카드를 선택하면 해당 결과를 다시 볼 수 있습니다.![스크린샷 2024-06-26 211312](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/c3e3ac33-aaef-4b26-8233-5f2997f35bb1)

4. 내 주변 타로 점집 확인 서비스
   1. 현재 위치 확인 가능 시 최초 현재 위치를 기준점으로 내 주변 타로 점집의 위치를 확인해줍니다.![스크린샷 2024-06-26 211359](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/d27fc786-2ea7-4b42-a777-5ab7ada7df79)

   2. 현재 위치 확인 불가능 시 최초 서울시청을 기준점으로 주변 타로 점집의 위치를 확인해줍니다.![스크린샷 2024-06-26 211418](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/f6b9c25f-582b-48aa-95a7-14d26f191039)

   3. 우측 하단의 확대 축소 기능을 통해 지도를 확대 축소가 가능합니다.![스크린샷 2024-06-26 211443](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/26e12ef2-70fd-456c-bfc0-5c0308af2780)

   4. 지도를 이동시켜 확인 시 최대 15개의 주변 타로 점집의 위치가 화면에 표시됩니다.![스크린샷 2024-06-26 211519](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/b29707e6-b65e-4358-908c-5293fcbea0df)

   5. 마크를 클릭 시 해당 점집의 정보가 표시되며, 길찾기 또는 상세보기를 클릭 시 카카오맵과 연결됩니다.![스크린샷 2024-06-26 211533](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/71a65435-97ac-4991-8765-e02da41687a1)


## 🐋부가 실현 기능
1. 타로에 익숙하지 않은 사람을 위한 카드 설명
   1. 첫 화면(타로에 대해서)은 타로에 대한 설명과 각 타로 카드가 가지는 의미를 설명합니다.![스크린샷 2024-06-26 213218](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/5b6b9480-a4fe-4447-9e9f-1380a16431b8)

      1. 메이저 타로의 경우 각 타로의 정방향과 역방향의 의미를 제공하며, 해당 타로 카드 행에 마우스 오버 시 표시가 되며, 클릭 시 해당 상세 설명으로 넘어갑니다.![스크린샷 2024-06-26 213236](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/a25d6c01-a261-473c-82b3-60c6a116bba7)

      2. 마이너 타로의 경우 각 타로의 의미를 제공하며, 마우스 오버 시 해당 어떤 명칭의 몇 번인지 가르켜 주도록 표시가 되며, 클릭 시 해당 상세 설명으로 넘어갑니다.![스크린샷 2024-06-26 213252](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/2b431129-1569-49ba-89cd-f71be742a7f7)

   2. 상세 화면(메이저 아르카나 또는 마이너 아르카나)은 해당 타로에 대한 카드 이미지, 수비학적의미, 회확적의미 그리고 카드에 대한 부가 설명을 제공합니다. ![스크린샷 2024-06-26 213447](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/df3913a5-e584-4ee1-814c-28bb4c813d21)

   3. 좌측의 화살표 버튼을 눌러서 카드 설명 내에서 이동이 가능합니다.![스크린샷 2024-06-26 213528](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/31790f4c-1865-4c33-af81-c1b06d4c7a99)

3. 홈 화면의 스크롤 움직임에 따른 애니메이션 구현으로 사용자의 흥미 유도![타로밀크티홈화면스크롤](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/84a32e5d-59a0-49d1-baac-6063fa46f0e3)

4. leonardo.ai를 통해 유니버설 타로 카드를 비롯한 기존의 타로 카드를 대신한 타로밀크티만의 타로 카드 이미지 제공![스크린샷 2024-06-26 214921](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/079b3641-21f1-4646-8127-04d1450c77cc)
5. 반응형 웹 사이트로, 다양한 디바이스(휴대폰, 태블릿, PC)에서 각기 다른 최적화된 UI를 제공합니다.

   | 홈 화면 | 카드 설명 | 운세 보기 |
   |------------|------------|------------|
   | ![Screenshot_20240626_222003_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/eb8d2f83-8816-4c66-9b10-8174b4edd480) | ![Screenshot_20240626_222010_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/e30ce96d-d548-42eb-9eff-5408d8b06db0) | ![Screenshot_20240626_222016_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/3481b4d6-fca0-4827-80fd-617aca71be90) |

   <br>

   | AI 답변 대기 | AI 답변 수령 | 주변 점집 |
   |------------|------------|------------|
   | ![Screenshot_20240626_222130_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/9d98fe83-8ebc-435d-aa6d-e4caef37594c) | ![Screenshot_20240626_222147_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/3727cb26-4f05-4c13-a9a1-4cfd5d3cb7f0) | ![Screenshot_20240626_222022_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/011a70ba-ce80-40f6-8aa5-3e946768e23a) |

   <br>

   | 로그인 | 마이페이지 | 결과보관함 |
   |------------|------------|------------|
   | ![Screenshot_20240626_222027_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/a078ff11-bc85-4121-b158-c37921815cc8) | ![Screenshot_20240626_222049_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/96d91037-288c-42ca-a60d-49c278c866bf) | ![Screenshot_20240626_222055_Samsung Internet](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/17bbbf3f-52a4-4041-91eb-097a43b43de5) |

   <br>



# 📈기술 스택
<table>
<tr>
<td align="center">언어</td>
<td>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/>
</td>
</tr>
<tr>
<td align="center">프레임워크</td>
<td>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
</td>
</tr>
<tr>
<td align="center">라이브러리</td>
<td>
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux Toolkit-5C2D91?style=for-the-badge&logo=reduxtoolkit&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/jwt-6DB33F?style=for-the-badge&logo=jwt&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/django%20allauth-3776AB?style=for-the-badge&logo=django%20allauth&logoColor=ffffff" />
<img src="https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=ffffff" />
</td>
</tr>
<tr>
<td align="center">패키지 매니저</td>
<td>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/pip-3775A9?style=for-the-badge&logo=pypi&logoColor=white" />
</td>
</tr>
<tr>
<td align="center">인프라</td>
<td>
<img src="https://img.shields.io/badge/MYSQL-4479A1?style=for-the-badge&logo=MYSQL&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/amazon%20aws-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/AMAZON RDS-FF9900?style=for-the-badge&logo=AMAZONRDS&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/NGINX-6DB33F?style=for-the-badge&logo=NGINX&logoColor=white"/>
</tr>
<tr>
<td align="center">협업툴</td>
<td>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
</td>
</tr>
<tr>
<td align="center">기타</td>
<td>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/google%20authenticator-4285F4?style=for-the-badge&logo=googleauthenticator&logoColor=white" />
<img src="https://img.shields.io/badge/github%20authenticator-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/kakao%20Login-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" />
<img src="https://img.shields.io/badge/kakao%20map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" />
<img src="https://img.shields.io/badge/leonardo.ai-512BD4?style=for-the-badge&logo=leonardo.ai&logoColor=black" />
</td>
</tr>
</table>


# 🧩아키텍처
![tarotmilktea 아키텍쳐](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/17972d01-0a73-44bb-8e3f-8c7b961f853d)

Nginx를 통해 웹서버 역할을 부여하고, React와 Django를 연동하여 실행.

React는 프론트엔드, Django는 백엔드로 사용. 이때, Django는 Gunicorn 통해 Nginx와 통신.

Docker를 이용해 이미지 빌드 후, 이를 AWS EC2 인스턴에서 실행.

선택한 타로에 질의응답을 처리하기 위해 Google Gemini 사용.


# 📚ERD
![tarotmilkteaERD](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/5333f81b-95a9-496b-a0db-aff00f055fb2)


# 📁폴더 구조
**Backend**
```
tarotMilkTea/
├── backend/
│   └── tarotMilkTea/
│       └── tarotback/
│           ├── accounts/
│           ├── backserver/
│           ├── tarotcards/
│           ├── .env
│           ├── Dockerfile
│           ├── entrypoint.sh
│           └── manage.py
├── frontend/
│   └── tarotmilktea/
│       ├── node_modules/
│       ├── public/
│       └── src/
│           ├── assets/
│           ├── axios/
│           ├── components/
│           ├── store/
│           ├── App.tsx
│           └── index.tsx
│       ├── .env
│       ├── Dockerfile
│       ├── package.json
│       ├── package-lock.json
│       └── tsconfig
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

# 📒회고
첫 설계부터 배포까지 모든 것을 혼자 진행한 첫 프로젝트입니다.
중간 중간 많은 변수와 오류로 인해 방향을 바꾼 부분도 있고, 해결한 부분도 있습니다. 이런 '우당탕탕'이 어울리는 과정을 통해 배포까지 성공하여 실서비스를 제공까지 왔습니다.

이번 회고를 통해 아래에 프로젝트 과정 중 크게 기억나는 몇 가지의 맞닥뜨린 문제들을 기록해봅니다.

## 맞닥뜨린 문제1
컨셉은 정했지만, 이후 이 것을 어떻게 사용자에게 보여주게 할 지에 대해서 부터 문제였습니다.
운세를 보곤 했지만, 그것이 어떤 과정을 통해 나오는 지는 몰랐기에 컨셉이 타로에 대해서 미약하게 공부를 했습니다.
그리고, 이미 나온 제품들의 경우 어떤 방식으로 사용자가 운세를 점치도록 하는지, 더 방문하고 싶게 만드는지 알기위해 10개 정도의 앱을 다운받아 사용해 봤고, 웹 사이트는 더 많이 들어가보았습니다.
이런 과정을 통해 많은 운세가 있지만, 타로 점을 봐주는 사이트를 제공해야겠다라는게 확실히 정해졌고, 제가 봐줄 수는 없기에 저를 대신할 수 있는 혁신적인 기술인 AI 챗봇을 이용하기로 했습니다.

## 맞닥뜨린 문제2
AI 챗봇에 있어서 제일 유명한 것은 chat GPT이지만, 국내 실황에 맞게 CLOVAX도  고려를 했으며, 이 시간에도 가장 많은 정보가 입력되고 있는 Google의 Gemini를 고려했습니다. 우선 CLOVA X는 국내 사용자에게 매력적이라고 할 수는 있었지만, 네이버의 B2B 위주 API 제공으로 사업자가 아닌 본인에게는 매력적이지 않았으며, 특히 기업 페이지의 AI 챗봇 상담사에게 어울리는 제품이어서 배재되었습니다. chat GPT와 google의 Gemini를 고려했는데, 이 중 gemini를 선택한 이유는 우선 gpt 보다 최근의 정보 그리고 많은 데이터를 학습했기 때문입니다. 그리고 또한 API 제공이 일정량 이하는 무료 제공이기에 google의 API를 사용하기로 했습니다.
이후 gemini api 사용하는 방법 또한 잠깐의 문제였지만, 짧은 기간에 많은 참고 문서들이 생겨 금방 해결할 수 있었습니다.

## 맞닥뜨린 문제3
스크롤 애니메이션을 구현하려 했으나, 첫 스크롤 애니메이션이었기에 사용하는 방법을 영상과 참고 문서등을 통해 학습 후 진행했습니다. 처음에는 스크롤 애니메이션이 제대로 된 작동을 하지 않아서 문제를 보니 position의 문제였고, 이와 함께 opacity를 각 스크롤의 위치에 따라 바뀔 수 있게 계산을 하여 코드를 입력하니 원하는 방식으로 작동 하는 것을 확인했습니다.

## 맞닥뜨린 문제4
카카오 맵을 타로 점집에 이용하려고 하는 과정 중에 카카오에서는 javascript에 어떻게 적용을 하면 되는지에 대한 내용이 친절하게 있었습니다. 그러나, 제가 사용하고 있는 것은 react를 사용하고 있었기 때문에, 그 코드를 그대로 사용하기엔 문제가 있었고, 이를 react-kakao-maps-sdk를 사용할까 했으나, typescript를 지원한다고는 하나 아직 완벽한 해결은 되지않았는지 오류가 생성되어, 기존 kakao에서 제공해주는 방식을 사용했습니다. 이 과정에 react에서는 dom을 직접적으로 건드리지 않는것을 강하게 권유하고 있지만, dom을 건드리면서 작업을 하게 되었습니다. 물론 작동은 문제 없이 아주 잘 됩니다. 아직 제 실력으로 이 dom을 건드리지 않고 react의 방식만을 이용해서 해결할 수는 없지만, 차후 실력이 된다면 그 때 kakao map을 쓰게 된다면, react 스럽게 코드를 작성하겠습니다.

## 맞닥뜨린 문제5
처음 계획을 할 때는 로그인 로그아웃이 필요하지 않은 누구나 사용할 수 있도록 생각을 하고 계획을 했습니다. 하지만, 내가 본 운세를 기록할 수 있게 해야겠다는 생각이 들었고, 실제로 그렇게 하고 있는 운세 앱들이 있기에 user모델을 생성했습니다. django는 이미 user모델이 있지만, 제가 필요한 user를 만들기 위해 customUser를 생성했습니다. 하지만, 이미 프로젝트는 진행되고 있었기 때문에 migration에서 문제가 발생했습니다. 계속 되는 오류로 인해 결국 backend로 사용하고 있던 django 프로젝트를 모두 삭제하고 처음부터 user모델을 비롯한 DB table을 생성한 뒤 시작했습니다.
이를 통해 DB의 구조는 프로젝트의 맨 처음 계획이 완료된 채로 시작해야만 문제가 생길 여지를 주지 않는다를 몸소 체험했습니다.

## 맞닥뜨린 문제6
처음에는 DB를 mongoDB를 사용했습니다. 이유는 회원이 필요하지 않은 누구나 사용할 수 있도록 생각을 하고 있었으며, 일정량 이하는 무료로 네트워크를 통한 DB제공이 가능했기 대문입니다. 또한 noSQL DB로 관계형으로 사용할 생각이 없었기 때문이었는데, 실제 프로젝트르 진행 하면서 타로 카드의 의미와 설명과 관련해서 관계형으로 DB에서 가져오는 것이 더 낫다는 판단을 하고 mysql로 Database를 바꿨습니다.
그리고 mongoDB를 사용하면서 db에서 데이터를 생성하면서 생기는 id가 objectID라는 int형식이 아닌 mongoDB만의 형식의 id를 이용하기에 이것을 이용하는데도 문제가 있었기에 mysql로 DB를 바꾼 바도 있습니다. 하지만 objectID를 이용한다 하더라도 결국은 관계형으로 이용하는데는 불편함과 문제가 있기에 mysql로 변경했습니다.

## 맞닥뜨린 문제7
소셜 로그인을 하면서 해당 소셜 로그인을 할 수 있는 공식문서와 참고 문서들을 먼저 확인 했지만, 하나의 프레임워크에서만 사용하는 것에 대한 설명만 있었기에 front로 react를 사용하고, back으로 django를 사용하는 저에게는 각자 어느만큼의 부분이 필요한지를 파악하는데 문제가 있었습니다. 하지만 직접 해보면서 토큰을 받아올 수 있도록 하는 code를 받는 과정은 front에서 진행하고 그 이후의 과정은 back에서 진행하면 되었습니다. 이 과정을 통해  kakao, github, google 3개의 소셜로그인을 성공적으로 진행할 수 있었습니다.

## 맞닥뜨린 문제8
소셜 로그인을 구현하고 또 다른 난관에 봉착했습니다. 어떻게 '타로밀크티' 서비스의 회원인지, 또 어떻게 회원을 관리할지에 대한 문제였습니다. 로그인을 해야한다는 것은 생각을 해두었지만, 로그인만 된다고 모든게 해결된게 아닌 데이터를 저장하고 관리해야하는 것을 인지했습니다.
하나의 계정에 로그인들을 모두 통합시킬지, 아니면 각 소셜 로그인별로 개별 관리할지 고민을 하다, 개별 관리하는 방법으로 진행했습니다. 애초에 사이트 로그인은 따로 염두에 두지 않았고, 또한 각 소셜 로그인을 하나의 계정으로 통합하는 것도 좋지만, 각각으로 관리하는 것이 사용자도 좋아하지않을까 하는 개인적인 판단으로 각각 관리했습니다.
만일 통합관리한다면, 웹사이트 계정을 만들고 그 계정에 연동시키는 방법을 사용하거나, 소셜 로그인 시 받을 수 있는 정보를 더 많이 받도록 하여, 겹치는 내용들을 기반으로 계정을 관리하지 않았을까 합니다.
그리고 첫 고민이었던 회원인지 아닌지 여부는 Django에서 기본적으로 제공해주는 세션이나 토큰 방식을 사용할까 했지만, simple-jwt를 이용해 JWT로 인증하는 방식을 사용했습니다. accesstoken과 refreshtoken을 이용해 더 안정적으로 관리해볼 수 있지않을까 하는 마음에 사용해봤습니다.
다음에 프로젝트를 새로 한다면, 어떻게 회원을 관리할 것인지에 대해서도 미리 계획하고 진행하겠습니다. 

## 맞닥뜨린 문제9
배포와 관련해서는 이전에 몇 번의 프로젝트를 진행하면서도 손을 대본 적이 전혀 없었기에 아주 기초적인 지식부터 쌓아야 했습니다.
이 과정에서 다음과 같은 기초적인 사실들을 알게 되었습니다.
1. nginx를 이용한 웹 서버 구축: 사용자가 nginx를 통해 React로 생성된 브라우저 화면에 접근할 수 있습니다. 이때 nginx는 리버스 프록시 서버로서, React 애플리케이션의 정적 파일을 제공하는 데 사용됨을 알 수 있었습니다.
2. Django와 Gunicorn: Django 애플리케이션은 Gunicorn과 같은 WSGI 서버를 통해 실행됩니다. Gunicorn은 Python WSGI HTTP 서버로, Django 애플리케이션을 서비스할 수 있도록 도운다는 것을 알 수 있었습니다.
3. nginx와 Gunicorn의 조합: nginx는 정적 파일을 제공하고, Gunicorn과 같은 애플리케이션 서버와 통신하여 동적 요청을 처리합니다. nginx는 클라이언트 요청을 받아서 Gunicorn으로 전달하고, Gunicorn은 Django 애플리케이션을 실행하여 요청을 처리한다느 것을 알 수 있었습니다.

그리고 저는 AWS EC2 프리티어 인스턴스를 이용했습니다. 이유는 제 컴퓨터를 24시간 가동할 수 없었으며, 프리티어는 1년 동안 무료이기에 제가 판매용이 아닌 개인 실력향상용의 프로젝트로는 충분하다고 생각했기 때문입니다.
이 EC2에 제 코드를 배포하기 위해서 docker를 이용했습니다. 처음에는 dockerfile을 만드는 방법과 nginx를 사용하기 위해 설정해야하는 방법을 전혀 몰랐기에 애초에 빌드조차 되지 않았지만, 검색과 docker에서 사용하는 명령어, nginx 사용법 등을 통해 이를 해결해내고, 이미지를 빌드하는데 성공했습니다.
여기서 다시 난관에 봉착했습니다. 이유는 .env파일을 사용중에 있었는데, 이것을 어떻게 github를 통해 ec2에서 가져온 코드가 이미지를 제대로 빌드하고 실행할 수 있을지 몰랐기 때문입니다. 고민 한 이유는 .gitignore에 의해 .env가 걸러졌기 때문입니다.
그래서 전 github의 코드를 ec2에서 사용해서 배포하는 방식이아닌, docker hub에 push와 pull 기능을 이용해서 로컬에서 이미지를 빌드하고, ec2 인스턴스에서 이미지를 pull받아 실행했고, 잘 작동하는 것을 확인할 수 있었습니다.

다음번에 진행을 하게 된다면, 처음부터 배포를 완전히 생각하고, github action 또는 jenkins를 사용해서 자동화 배포 또한 진행 해보겠습니다.

## 맞닥뜨린 문제10
http에서 https로 전환하는 문제가 있었습니다. 도메인이 http로 설정이 되니 제 기능 중 하나인 내 주변 타로 점집을 확인할 수 가 없었습니다. 이유는 geolocation을 사용할 수 없었기 때문입니다. 이에 따라 https를 사용 할 수 있는 방법을 찾았고, 처음에는 AWS Certificate Manager와 로드밸런서를 이용하는 방법을 진행했습니다. 그러나 각종 검색 결과에서 나온 방법들을 제가 사용하고 있는 django의 8000 port나 react의 3000 port를 제 아무리 이용해도 https를 이용할 수 없었기에, 결국 nginx에서 ssl을 이용하는 방법을 이용했고, Lets Encrypt 를 이용해서 SSL 인증서를 EC2에서 발급받아 사용했습니다. 이 때 배포방식이 로컬에서 도커 이미지를 빌드하고 도커 허브에 push 후 ec2 인스턴스에서 pull해서 이미지를 실행하는 방식이었기에 도커 이미지를 제대로 빌드하고 실행시키기 위해 ec2 인스턴스에서 SSL인증서를 가져왔고 이를 저장해서 로컬에서 이미지를 빌드해 성공시켰습니다.
하지만 https에서 계속해서 제대로 되지 않는 문제가 생겼는데, 이는 docker를 실행할 때 port번호를 명시해서 실행해줌으로  해결을 할 수 있었습니다.

위와 같은 문제를 겪으면서 다음에 프로젝트를 할 때는 특히나 DB부터 배포의 계획까지 확실하게 해서 계획을 구상하고 그에 맞춰 진행해야 더 수월할 수 있음을 몸소 체험했습니다.
이번 프로젝트를 발판삼아 다음에 있을 프로젝트에서는더 빠르고 정확하게 오류와 문제를 해결하도록 하겠습니다.

## 어찌 되었든 결승점을 통과하는 개발자 '김범기'의 'TAROT MILK TEA' README를 봐주셔서 감사합니다.
