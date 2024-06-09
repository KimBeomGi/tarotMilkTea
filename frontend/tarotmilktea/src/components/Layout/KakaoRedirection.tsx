import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import axios from 'axios';
import {getKakaoLoginCode} from '../../axios/homeAxios'


function KakaoRedirection() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  // 카카오 로그인을 위한 코드///////////////////////////////////////////////////////////////
  // const code = window.location.search;
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");

  useEffect(() => {
    console.log('code :',code)
    // console.log(process.env.REACT_APP_URL);
    // axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((r) => {
    //   console.log(r.data);

    //   // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
    //   localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장했다.
      
    //   navigate('/loginSuccess');
    // });
    
    if(code){
      handleGetKakaoLoginCode(code)
    }
    // navigate('/')
  }, []);

  async function handleGetKakaoLoginCode(code:string) {
    try {
      await getKakaoLoginCode(code);
    } catch (error) {
      console.log(error);
    }
  }
  ///////////////////////////////////////////////////////////////

  return (
    <div className="KakaoRedirection">
      <div>
        <h1>카카오 로그인 중입니다.</h1>
      </div>;
    </div>
  );
}

export default KakaoRedirection;
