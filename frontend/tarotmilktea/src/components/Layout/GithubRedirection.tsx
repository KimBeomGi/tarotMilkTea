import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { setProfileUrl, setNickname, setEmail } from "../../store/slices/account/accountSlice"
import axios from 'axios';
import {getGithubLoginCode} from '../../axios/homeAxios'
import "./Redirection.css"
import Cookies from 'js-cookie';

function GithubRedirection() {
  // const profileUrl = useAppSelector((state) =>state.account.profileUrl)
  // const nickname = useAppSelector((state) =>state.account.nickname)
  const dispatch = useAppDispatch()

  // 깃허브 로그인을 위한 코드///////////////////////////////////////////////////////////////
  // const code = window.location.search;
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");

  useEffect(() => {
    console.log('githubCode :',code)
    if(code){
      handleGetGithubLoginCode(code)
    }
  }, []);

  // github 로그인
  async function handleGetGithubLoginCode(code:string) {
    try {
      const respose = await getGithubLoginCode(code);
      const responseData = respose?.data
      console.log(responseData)
      const tmt_token = responseData.access
      const tmt_refresh_token = responseData.refresh
      const nickname = responseData.userInfo.nickname
      const social = responseData.userInfo.social
      const email = responseData.userInfo.email
      const profile_image_url = responseData.userInfo.profile_image_url
      Cookies.set('tmt_token', tmt_token);
      Cookies.set('tmt_refresh_token', tmt_refresh_token);
      Cookies.set('provide', social);
      Cookies.set('userinfo', JSON.stringify({
        profile_image_url: profile_image_url,
        nickname: nickname,
        email: email
      }));
      navigate('/')
    
      // const tmt_ACCESS_TOKEN = responseData.tmt_ACCESS_TOKEN
      // const github_ACCESS_TOKEN = responseData.github_ACCESS_TOKEN
      // const nickname = responseData.nickname
      // const profile_url = responseData.profile_url
      // const email = responseData.email
      // window.localStorage.setItem("tmt_ACCESS_TOKEN", tmt_ACCESS_TOKEN)
      // window.localStorage.setItem("provide_ACCESS_TOKEN", github_ACCESS_TOKEN)
      // window.localStorage.setItem("provide", 'github')
      // window.localStorage.setItem("userinfo",JSON.stringify({
      //   "profile_url": profile_url,
      //   "nickname":nickname,
      //   "email":email
      // }))
      // dispatch(setProfileUrl(profile_url))
      // dispatch(setNickname(nickname))
      // dispatch(setEmail(email))
      // navigate('/')

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
    <div className="GithubRedirection redirectionContainer">
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

export default GithubRedirection;
