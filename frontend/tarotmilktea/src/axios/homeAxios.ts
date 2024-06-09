import axios from "axios";

const base_url = "http://127.0.0.1:8000/"

export async function getKakaoLoginCode() { // async, await을 사용하는 경우
  try {
    const response = await axios.get(`${base_url}login/kakao/`); // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}