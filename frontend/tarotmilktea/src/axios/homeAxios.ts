import axios from "axios";

const base_url = "http://127.0.0.1:8000/"

// 카카오 로그인을 위한 
export async function getKakaoLoginCode(code:string) { // async, await을 사용하는 경우
  console.log(code)
  try {
    const response = await axios.post(`${base_url}users/kakao/`, {code}) // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}