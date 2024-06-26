# tarotMilkTea: AI 타로점 웹사이트

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

3. 홈 화면의 스크롤 이벤트에 따른 애니메이션 구현으로 사용자의 흥미 유도![타로밀크티홈화면스크롤](https://github.com/KimBeomGi/tarotMilkTea/assets/128961042/84a32e5d-59a0-49d1-baac-6063fa46f0e3)

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
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/jwt-6DB33F?style=for-the-badge&logo=jwt&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux Toolkit-5C2D91?style=for-the-badge&logo=reduxtoolkit&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/JWT-3776AB?style=for-the-badge&logo=JWT&logoColor=ffffff"/>
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

