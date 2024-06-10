import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { setProfileUrl, setNickname, setEmail } from "../../store/slices/account/accountSlice"
import axios from 'axios';
import {getGithubLoginCode} from '../../axios/homeAxios'


function GithubRedirection() {
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
    if(code){
      handleGetGithubLoginCode(code)
    }
  }, []);

  // github 로그인
  async function handleGetGithubLoginCode(code:string) {
    try {
      const respose = await getGithubLoginCode(code);
      const responseData = respose?.data
      const tmt_ACCESS_TOKEN = responseData.tmt_ACCESS_TOKEN
      const github_ACCESS_TOKEN = responseData.github_ACCESS_TOKEN
      const nickname = responseData.nickname
      const profile_url = responseData.profile_url
      const email = responseData.email
      window.localStorage.setItem("tmt_ACCESS_TOKEN", tmt_ACCESS_TOKEN)
      window.localStorage.setItem("provide_ACCESS_TOKEN", github_ACCESS_TOKEN)
      window.localStorage.setItem("provide", 'github')
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

  return (
    <div className="GithubRedirection">
      <div>
        <h1>로그인 중입니다.</h1>
      </div>;
    </div>
  );
}

export default GithubRedirection;
