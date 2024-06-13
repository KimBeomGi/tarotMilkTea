import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import "./MyPage.css"
import {getKakaoLogout, getGithubLogout, getGoogleLogout, getTokenRefresh, isTokenVerify} from '../../axios/homeAxios'

import Cookies from 'js-cookie';
import { ScriptElementKindModifier } from 'typescript';

function MyPage() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()
  // const [incrementN, setIncrementN] = useState<number>(7)
  // const [discountN, setDiscountN] = useState<number>(7)
  const navigate = useNavigate()

  const [profileImageUrl, setProfileImageUrl] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")

  //정보 쿠키에서 가져옴////////////////////////////////////////////////////////////////////////
  const getUserInfo = () =>{
    const userInfoString = Cookies.get('userinfo')
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString)
        setNickname(userInfo.nickname)
        setProfileImageUrl(userInfo.profile_image_url)
        setEmail(userInfo.email)
        
      } catch (error) {
        console.error("Failed to parse userinfo from localStorage:", error)
      }
    } else {
      console.log("No userinfo found in localStorage")
      // navigate('/')
      window.location.href = 'http://127.0.0.1:3000/'
    }
  }

  async function handleGetTokenRefresh() {
    const tmt_refresh_token = Cookies.get('tmt_refresh_token')
    if(tmt_refresh_token){
      await getTokenRefresh(tmt_refresh_token)
    }
  }

  async function handleIsTokenVerify() {
    const tmt_token = Cookies.get('tmt_token')
    if(tmt_token){
      const response = await isTokenVerify(tmt_token)
      if(response.status === 200){

      }else if(response.status === 401){
        handleGetTokenRefresh()
      }
      // return response.status
    }else{
      window.location.href = 'http://127.0.0.1:3000/' 
    }
  }

  useEffect(() => {
    handleIsTokenVerify()
    getUserInfo()
  },[])
  ////////////////////////////////////////////////////////////////////////

  async function handleGetLogout(){
    // const tmt_ACCESS_TOKEN  = window.localStorage.getItem("tmt_ACCESS_TOKEN")
    // const provide_ACCESS_TOKEN  = window.localStorage.getItem("provide_ACCESS_TOKEN")
    // const provide = window.localStorage.getItem("provide")
    const tmt_token = Cookies.get('tmt_token');
    const tmt_refresh_token = Cookies.get('tmt_refresh_token');
    const provide = Cookies.get('provide');
    const userinfo = JSON.parse(Cookies.get('userinfo') || '{}');

    // if (provide === "kakao" && provide_ACCESS_TOKEN && tmt_ACCESS_TOKEN) {
    //   try {
    //     const Response = await getKakaoLogout(provide_ACCESS_TOKEN, tmt_ACCESS_TOKEN)
    //     console.log(Response?.status)
    //     // localStroage에 있는 토큰과 정보 초기화
    //     window.localStorage.setItem("tmt_ACCESS_TOKEN", "")
    //     window.localStorage.setItem("provide_ACCESS_TOKEN", "")
    //     window.localStorage.setItem("provide", '')
    //     window.localStorage.setItem("userinfo",JSON.stringify({
    //       "profile_url": "",
    //       "nickname":"",
    //       "email":""
    //     }))
    //     // navigate('/')
    //     window.location.href = 'http://127.0.0.1:3000/'
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }else if(provide === "github" && provide_ACCESS_TOKEN && tmt_ACCESS_TOKEN){
    //   try {
    //     const Response = await getGithubLogout(provide_ACCESS_TOKEN, tmt_ACCESS_TOKEN)
    //     console.log(Response?.status)
    //     // localStroage에 있는 토큰과 정보 초기화
    //     window.localStorage.setItem("tmt_ACCESS_TOKEN", "")
    //     window.localStorage.setItem("provide_ACCESS_TOKEN", "")
    //     window.localStorage.setItem("provide", '')
    //     window.localStorage.setItem("userinfo",JSON.stringify({
    //       "profile_url": "",
    //       "nickname":"",
    //       "email":""
    //     }))
    //     // navigate('/')
    //     window.location.href = 'http://127.0.0.1:3000/'
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    if(provide === "google" && tmt_token){
      try {
        const response = await getGoogleLogout(tmt_token)
        console.log('response?.status===',response?.status)
        // 쿠키에 있는 토큰과 정보 초기화

        Cookies.remove('tmt_token');
        Cookies.remove('tmt_refresh_token');
        Cookies.remove('provide');
        Cookies.remove('userinfo');
        // navigate('/')
        window.location.href = 'http://127.0.0.1:3000/'
      } catch (error) {
        console.log(error)
      }
    }else if(provide === "kakao" && tmt_token){
      // kakao의 토큰 로그아웃도 있지만, 현재는 tmt에서만의 로그아웃을 구현
      try {
        const response = await getGoogleLogout(tmt_token)
        console.log('response?.status===',response?.status)
        // 쿠키에 있는 토큰과 정보 초기화

        Cookies.remove('tmt_token');
        Cookies.remove('tmt_refresh_token');
        Cookies.remove('provide');
        Cookies.remove('userinfo');
        // navigate('/')
        window.location.href = 'http://127.0.0.1:3000/'
      } catch (error) {
        console.log(error)
      }
    }
  }  


  return (
    <div className="MyPage">
      <div className='myPageContainer'>
        <div>
          <h1>마이페이지</h1>
        </div>
        <table className="styled-table">
          <tbody>
            <tr>
              <td className="first-column">닉네임</td>
              <td>{nickname}</td>
            </tr>
            <tr>
              <td className="first-column">이메일</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
          {/* <img src={profileImageUrl} alt="" /> */}
        {/* <div>
          <p>{nickname}</p>
          <p>{email}</p>
        </div> */}
        <div>
          <p 
            className='logoutP'
            onClick={() => {handleGetLogout()}}
            >
            <span>로그아웃</span>
          </p>
          {/* <p
            onClick={() => {handleGetTokenRefresh()}}
          >리프레쉬토큰</p> */}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
