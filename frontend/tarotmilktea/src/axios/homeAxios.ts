import axios from "axios";
import Cookies from "js-cookie";

// const base_url = "http://127.0.0.1:8000/"
const base_url = "http://tarotmilkteakbg.site/api/"

// 카카오 로그인을 위한 
export async function getKakaoLoginCode(code:string) { // async, await을 사용하는 경우
  // console.log('getKakaoLoginCode: ',code)
  try {
    const response = await axios.post(`${base_url}accounts/kakao/login/`, {code}) // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    console.log("response===", response)
    return response
  } catch (e:any) {
    // 실패 시 처리
    console.error(e.response.status);
  }
}

// 카카오 로그아웃
// export async function getKakaoLogout(kakao_ACCESS_TOKEN:string, tmt_ACCESS_TOKEN:string){
//   console.log("getKakaoLogout")
//   const data={
//     "kakao_ACCESS_TOKEN" : kakao_ACCESS_TOKEN,
//     "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN
//   }
//   try {
//     // const response = await axios.post(`${base_url}accounts/dj-rest-auth/logout/`)
//     const response = await axios.post(`${base_url}accounts/kakao/logout/`,data)
//     console.log(response)
//     console.log(response.data)
//     return response
//   } catch (e) {
//     // 실패 시 처리
//     console.error(e);
//   }
// }


// 카카오 로그아웃
export async function getKakaoLogout(tmt_token: string) {
  console.log('getKakaoLogout===', tmt_token);
  try {
      const response = await axios.post(`${base_url}accounts/dj-rest-auth/logout/`)
      console.log('response.status==', response.status)
      console.log('response.data==', response.data)
      return response;
  } catch (e: any) {
      const response = e.response;
      console.log(response.status);
      if (response.status === 401) {
          console.log('다시')
      }
  }
}

// 깃허브 로그인을 위한 
export async function getGithubLoginCode(code:string) { // async, await을 사용하는 경우
  console.log('getGithubLoginCode: ',code)
  try {
    const response = await axios.post(`${base_url}accounts/github/login/`, {code}) // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    console.log("response===", response)
    return response
  } catch (e:any) {
    // 실패 시 처리
    console.error(e.response.status);
  }
}

// 깃허브 로그아웃
export async function getGithubLogout(github_ACCESS_TOKEN:string, tmt_ACCESS_TOKEN:string){
  // console.log(tmt_ACCESS_TOKEN)
  // console.log(github_ACCESS_TOKEN)
  console.log("getgithubLogout")
  const data={
    "github_ACCESS_TOKEN" : github_ACCESS_TOKEN,
    "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN
  }
  try {
    const response = await axios.post(`${base_url}users/github/logout/`,data)
    console.log(response)
    console.log(response.data)
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

// 구글 로그인
export async function getGoogleLoginCode(code:string) { // async, await을 사용하는 경우
  // console.log("code===",code)
  try {
    const response = await axios.post(`${base_url}accounts/google/callback/`, { code: code})
    console.log("response===", response)
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

// 구글 로그아웃
export async function getGoogleLogout(tmt_token: string) {
  console.log('getGoogleLogout===', tmt_token);
  try {
      const response = await axios.post(`${base_url}accounts/dj-rest-auth/logout/`)
      console.log('response.status==', response.status)
      console.log('response.data==', response.data)
      return response;
  } catch (e: any) {
      const response = e.response;
      console.log(response.status);
      if (response.status === 401) {
          console.log('다시')
      }
  }
}

// 토큰 로그아웃
export async function getTokenLogout(tmt_token: string) {
  console.log('getGoogleLogout===', tmt_token);
  try {
      const response = await axios.post(`${base_url}accounts/dj-rest-auth/logout/`)
      console.log('response.status==', response.status)
      console.log('response.data==', response.data)
      return response;
  } catch (e: any) {
      const response = e.response;
      console.log(response.status);
      if (response.status === 401) {
          console.log('다시')
      }
  }
}

// 토큰 다시 가져오기
export async function getTokenRefresh(refreshtoken:string) {
  try {
    const response = await axios.post(`${base_url}accounts/dj-rest-auth/token/refresh/`, {refresh: refreshtoken})
    // console.log('response.status==', response.status)
    // console.log('response.data==', response.data)
    Cookies.set('tmt_token', response.data.access);
  } catch (error:any) {
    console.log(error.response.status)
  }
}

// 토큰 유효성 확인
export async function isTokenVerify(token:string) {
  try {
    const response = await axios.post(`${base_url}accounts/dj-rest-auth/token/verify/`, {token: token})
    // console.log('isTokenVerifyresponse.status==', response.status)
    // console.log('isTokenVerifyresponse.data==', response.data)
    if(response.status==200)
      return response
  } catch (error:any) {
    // console.log(error.response.status)
    if(error.response.status==401)
      return error.response
  }
}