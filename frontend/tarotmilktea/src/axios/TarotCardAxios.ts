import axios from "axios";
import {SaveTarotResultType, GetTarotResultDetailDataType} from "../components/types/readFortune/fortuneReadType"

// const base_url = "http://127.0.0.1:8000/"
// const base_url = "http://tarotmilkteakbg.site/api/"
const base_url = "https://tarotmilkteakbg.site/api/"

export async function getTarotCard() { // async, await을 사용하는 경우
  try {
    const response = await axios.get(`${base_url}tarotcard/`); // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
    
    return response
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

// GeminiApi를 이용한 운세 보기
export async function getReadTarotByGemini(sendData:any) {
  try {
  // POST 요청은 body에 실어 보냄
    const response = await axios.post(`${base_url}tarotcard/gemini/`, {
      subject: sendData.subject,
      concern: sendData.concern,
      selectedCard: sendData.selectedCard
    });
    
    return response
    
  } catch (e) {
    console.error(e);
  }
}

// 카드목록(일반) 가져오기
export async function getTarotList() {
  try {
    const response = await axios.get(`${base_url}tarotcard/`)
    
    return response
  } catch (e) {
    console.error(e)
  }
}
// 카드목록(상세) 가져오기
export async function getTarotDetailList() {
  try {
    const response = await axios.get(`${base_url}tarotcard/detail_list/`)
    
    return response
  } catch (e) {
    console.error(e)
  }
}
// 카드목록(메이저상세) 가져오기
export async function getTarotMajorList() {
  try {
    const response = await axios.get(`${base_url}tarotcard/major_list/`)
    
    return response
  } catch (e) {
    console.error(e)
  }
}
// 카드목록(마이너상세) 가져오기
export async function getTarotMinorList() {
  try {
    const response = await axios.get(`${base_url}tarotcard/minor_list/`)
    
    return response
  } catch (e) {
    console.error(e)
  }
}

// 카드세부(상세) 가져오기
export async function getTarotDetail(cardId:number) {
  try {
    const response = await axios.get(`${base_url}tarotcard/detail/${cardId}/`);
    
    return response;
  } catch (e) {
    console.error(e);
  }
}


// 카드 결과 저장하기
export async function saveTarotResult(sendData:SaveTarotResultType) {
  try {
    const response = await axios.post(`${base_url}tarotcard/save_result/`,{sendData}, {
      headers : {Authorization: `Bearer ${sendData.tmt_token}`,},
    });
    
    return response;
  } catch (e) {
    console.error(e);
  }
}

// 타로 결과 리스트 받아오기
export async function getTarotResultList(token:string) {
  try {
    const response = await axios.get(`${base_url}tarotcard/tarot_result/list/`, {
      headers : {Authorization: `Bearer ${token}`,},
    });
    
    return response;
  } catch (e:any) {
    // console.error(e.response);
    return e.response;
  }
}

// 타로 결과 1개 받아오기
export async function getTarotResultDetail(sendData:GetTarotResultDetailDataType) {

  try {
    const response = await axios.get(`${base_url}tarotcard/tarot_result/${sendData.tarotResultId}/`, {
      headers : {Authorization: `Bearer ${sendData.token}`,},
    });
    
    return response;
  } catch (e:any) {
    // console.error(e.response);
    return e.response;
  }
}

// tarot_result/<int:result_id>/

// 예시
// // GET
// async function getUser() { // async, await을 사용하는 경우
//     try {
//         // GET 요청은 params에 실어 보냄
//       const response = await axios.get('/user', {
//           params: {
//               ID: 12345
//           }
//       });
      
//       // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      
//       await axios.get('/user?ID=12345'); // 위의 요청과 동일
      
//       var userId = 12345;
//       await axios.get(`/user?ID=${userId}`); // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
      
//       console.log(response);
//     } catch (e) {
//       // 실패 시 처리
//       console.error(e);
//     }
//   }
//   // POST
//   async function postUser() {
//     try {
//     // POST 요청은 body에 실어 보냄
//       await axios.post('/user', {
//           firstName: 'Fred',
//           lastName: 'Flintstone'
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }

