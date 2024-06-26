import React, {useState} from 'react';

import { Outlet, Link, redirect, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import {KakaoParamsType, GithubParamsType} from '../types/home/homeType'
import {isTokenVerify} from '../../axios/homeAxios'
import "./Login.css"
import Cookies from 'js-cookie';


function Login() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)
  const navigate = useNavigate()

  // 토큰 여부를 확인하고 없을 때 진행하기
  const getIsTokenVerify = async (where:string) => {
    try {
      const tmt_token = Cookies.get('tmt_token')
      let response
      // 이미 로그인 되어있음.
      if(tmt_token){
        response = await isTokenVerify(tmt_token)
        // console.log(response.status)
        alert('이미 로그인 되어있습니다.')
        navigate('/')
      }else{
        // 로그인 진행
        if(where === "kakao"){
          navgiateToKakaoLogin()
        }else if(where === "github"){
          navigateGithubLogin()
        }else if(where === "google"){
          navigateGoogleLogin()
        }else{
          alert('로그인을 진행할 수 없습니다.')
          navigate('/')
        }
      }
    } catch (error:any) {
      // console.error('토큰 확인 중 오류 발생:', error);
      alert('나중에 다시 시도해주세요.');
      navigate('/')
    }
  }

  // kakao Login을 위한 코드///////////////////////////////////////////
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  if (!kakaoClientId || !kakaoRedirectUri) {
    throw new Error('REACT_APP_CLIENT_ID or REACT_APP_REDIRECT_URI is not defined');
  }
  const kakaoParams :KakaoParamsType = {
    "client_id" : kakaoClientId,
    "redirect_uri" :  kakaoRedirectUri,
    "response_type" : "code",
  }
  const kParams = new URLSearchParams(kakaoParams).toString()
  function navgiateToKakaoLogin(){
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  }
  //////////////////////////////////////////////////////////////////////////////////////
  // github Login을 위한 코드///////////////////////////////////////////
  const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const githubRedirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
  if (!githubClientId || !githubRedirectUri) {
    throw new Error('REACT_APP_GITHUB_CLIENT_ID or REACT_APP_GITHUB_REDIRECT_URI is not defined');
  }
  const githubParams :GithubParamsType = {
    "client_id" : githubClientId,
    "redirect_uri" : githubRedirectUri,
    "scope" : "read:user, user:email",
  }
  const gitParams = new URLSearchParams(githubParams).toString()
  function navigateGithubLogin(){
    window.location.href = `https://github.com/login/oauth/authorize?${gitParams}`
  }
  //////////////////////////////////////////////////////////////////////////////////////
  // google Login을 위한 코드
  // const base_url = "http://127.0.0.1:3000/"
  const googleScope = "https://www.googleapis.com/auth/userinfo.email"
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  // const googleCallBackUri = base_url + 'accounts/google/callback/'
  const googleRedirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  function navigateGoogleLogin(){
    window.location.href =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&response_type=code&redirect_uri=${googleRedirectUri}&scope=${googleScope}`
  }
  /////
  
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
            onClick={() => {
              // navgiateToKakaoLogin()
              getIsTokenVerify('kakao')
            }}
            >
            <img src={process.env.PUBLIC_URL+"images/kakaoLoginBtn1.png"} alt="" className='btnImg'/>
          </div>
          <div
            className='loginButton spacebetween loginButtonBorder bgGithub'
            onClick={() => {
              // navigateGithubLogin()
              getIsTokenVerify('github')
            }}
            >
              <img src={process.env.PUBLIC_URL+"images/githubLogo1.png"} alt="" className='btnLogoImg'/>
              <span className='loginBtnFont githubTextColor'>Github 로그인</span>
              <div className='btnLogoImg'></div>
          </div>
          <div
            className='loginButton spacebetween loginButtonBorder bgGoogle'
            onClick={() => {
              // navigateGoogleLogin()
              getIsTokenVerify('google')
            }}
            >
              <img src={process.env.PUBLIC_URL+"images/googleLogo.png"} alt="" className='btnLogoImg'/>
              <span className='loginBtnFont googleTextColor'>Google 로그인</span>
              <div className='btnLogoImg'></div>
          </div>
          <Link to="/" className='nodecoration'>메인 페이지로 이동</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
