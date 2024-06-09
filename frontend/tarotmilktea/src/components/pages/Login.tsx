import React, {useState} from 'react';

import { Outlet, Link, redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import {KakaoParamsType} from '../types/home/homeType'


function Login() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  // kakao Login을 위한 코드///////////////////////////////////////////
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
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
      <div>
        <h1>로그인 페이지</h1>
      </div>
      {/* <div>
        <button onClick={() => {dispatch(increment())}}>+</button>
        <button onClick={() => {dispatch(decrement())}}>-</button>
        <hr />
        <span>{incrementN}씩 증가</span>
        <button onClick={() => {dispatch(incrementByAmount(incrementN))}}>+</button>
        <hr />
        <span>{discountN}씩 증가</span>
        <button onClick={() => {dispatch(decrementByAmount(discountN))}}>-</button>
        <hr />
        <p>{count}</p>
      </div>
      <div>
        <p>
          <Link to="/Login">로그인</Link>
        </p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div> */}
      <button>
        <Link to="/">Home</Link>
      </button>
      <button
        onClick={() => {navgiateToKakaoLogin()}}
      >카카오 로그인</button>

    </div>
  );
}

export default Login;
