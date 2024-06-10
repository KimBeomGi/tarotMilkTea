import React, {useState} from 'react';

import { Outlet, Link, redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import {KakaoParamsType} from '../types/home/homeType'
import "./Login.css"


function Login() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  // kakao Login을 위한 코드///////////////////////////////////////////
  const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    throw new Error('REACT_APP_CLIENT_ID or REACT_APP_REDIRECT_URI is not defined');
  }
  const kakaoParams :KakaoParamsType = {
    "client_id" : clientId,
    "redirect_uri" :  redirectUri,
    "response_type" : "code",
  }
  const kParams = new URLSearchParams(kakaoParams).toString()

  function navgiateToKakaoLogin(){
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  }
  console.log(kParams)
  //////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <div className="Login">
      <div className="loginContainer">
        <div className='margin100'>
          <Link to="/">
            <img src={process.env.PUBLIC_URL+"/images/tarotMilkTea_logo.png"} alt="" className='tmtlogo' />
          </Link>
        </div>
          
        <div className='flexCenter'>
          <div
            className='loginButton'
            onClick={() => {navgiateToKakaoLogin()}}
            >
            <img src={process.env.PUBLIC_URL+"images/kakaoLoginBtn1.png"} alt="" className='btnImg'/>
          </div>
          <div
            className='loginButton spacebetween loginButtonBorder'
            >
              <img src={process.env.PUBLIC_URL+"images/githubLogo.png"} alt="" className='btnLogoImg'/>
              <span className='loginBtnFont'>Github 로그인</span>
              <div className='btnLogoImg'></div>
          </div>
          <Link to="/" className='nodecoration'>메인 페이지로 이동</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
