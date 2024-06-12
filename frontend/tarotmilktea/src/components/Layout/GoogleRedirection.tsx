import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { setProfileUrl, setNickname, setEmail } from "../../store/slices/account/accountSlice"
import axios from 'axios';
import {getKakaoLoginCode} from '../../axios/homeAxios'
import "./Redirection.css"


function GoogleRedirection() {
  // const profileUrl = useAppSelector((state) =>state.account.profileUrl)
  // const nickname = useAppSelector((state) =>state.account.nickname)
  const dispatch = useAppDispatch()

  // 카카오 로그인을 위한 코드///////////////////////////////////////////////////////////////
  // const code = window.location.search;
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");

  useEffect(() => {
    console.log('code :',code)
    // 이제 이 코드를 백으로 넘겨서 값을 받아와야함.
    // if(code){
    //   handleGetKakaoLoginCode(code)
    // }
    
    // 리디렉션으로 넘어온 URI 코드
    // const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    // const accessToken = parsedHash.get("access_token");
    // const { data } = await Api.post("oauth/google", { accessToken });
    // 위의 코드를 이용해서 쿼리문으로 받아온 access_token 값을 뽑아오고 백엔드로 넘겨준다.
  }, []);

  async function handleGetKakaoLoginCode(code:string) {
    try {
      const respose = await getKakaoLoginCode(code);
      const responseData = respose?.data
      const tmt_ACCESS_TOKEN = responseData.tmt_ACCESS_TOKEN
      const kakao_ACCESS_TOKEN = responseData.kakao_ACCESS_TOKEN
      const nickname = responseData.nickname
      const profile_url = responseData.profile_url
      const email = responseData.email
      window.localStorage.setItem("tmt_ACCESS_TOKEN", tmt_ACCESS_TOKEN)
      window.localStorage.setItem("provide_ACCESS_TOKEN", kakao_ACCESS_TOKEN)
      window.localStorage.setItem("provide", 'kakao')
      window.localStorage.setItem("userinfo",JSON.stringify({
        "profile_url": profile_url,
        "nickname":nickname,
        "email":email
      }))
      dispatch(setProfileUrl(profile_url))
      dispatch(setNickname(nickname))
      dispatch(setEmail(email))
      navigate('/')

    } catch (error) {
      console.log(error);
    }
  }
  ///////////////////////////////////////////////////////////////

  // 대기창 화면
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="GoogleRedirection redirectionContainer">
      <div className="redirectionDiv">
        <div>
          <h1>로그인 중입니다.{'.'.repeat(count)}</h1>
        </div>
        <p>다른 페이지로 넘어가지 마세요.</p>
        <div>
          <img src={process.env.PUBLIC_URL+"/loadingicon.png"} alt="" className='loadingImg'/>
        </div>
      </div>
    </div>
  );
}

export default GoogleRedirection;
