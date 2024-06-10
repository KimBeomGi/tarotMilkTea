import axios from "axios";

const base_url = "http://127.0.0.1:8000/"

// 카카오 로그인을 위한 
export async function getKakaoLoginCode(code:string) { // async, await을 사용하는 경우
  console.log(code)
  try {
    const response = await axios.post(`${base_url}users/kakao/login/`, {code}) // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    console.log(response)
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

export async function getKakaoLogout(kakao_ACCESS_TOKEN:string, tmt_ACCESS_TOKEN:string){
  // console.log(tmt_ACCESS_TOKEN)
  // console.log(kakao_ACCESS_TOKEN)
  console.log("getKakaoLogout")
  const data={
    "kakao_ACCESS_TOKEN" : kakao_ACCESS_TOKEN,
    "tmt_ACCESS_TOKEN" : tmt_ACCESS_TOKEN
  }
  try {
    const response = await axios.post(`${base_url}users/kakao/logout/`,data)
    console.log(response)
    console.log(response.data)
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

// 깃허브 로그인을 위한 
export async function getGithubLoginCode(code:string) { // async, await을 사용하는 경우
  console.log(code)
  try {
    const response = await axios.post(`${base_url}users/github/login/`, {code}) // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    console.log(response)
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
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