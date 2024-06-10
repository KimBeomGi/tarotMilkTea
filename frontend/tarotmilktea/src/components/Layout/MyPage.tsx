import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import "./MyPage.css"
import {getKakaoLogout, getGithubLogout} from '../../axios/homeAxios'

function MyPage() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()
  // const [incrementN, setIncrementN] = useState<number>(7)
  // const [discountN, setDiscountN] = useState<number>(7)
  const navigate = useNavigate()

  const [profileUrl, setProfileUrl] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")

  const getUserInfo = () =>{
    const userInfoString = window.localStorage.getItem("userinfo")
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString)
        setNickname(userInfo.nickname)
        setProfileUrl(userInfo.profile_url)
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


  async function handleGetLogout(){
    const tmt_ACCESS_TOKEN  = window.localStorage.getItem("tmt_ACCESS_TOKEN")
    const provide_ACCESS_TOKEN  = window.localStorage.getItem("provide_ACCESS_TOKEN")
    const provide = window.localStorage.getItem("provide")
    if (provide === "kakao" && provide_ACCESS_TOKEN && tmt_ACCESS_TOKEN) {
      try {
        const Response = await getKakaoLogout(provide_ACCESS_TOKEN, tmt_ACCESS_TOKEN)
        console.log(Response?.status)
        // localStroage에 있는 토큰과 정보 초기화
        window.localStorage.setItem("tmt_ACCESS_TOKEN", "")
        window.localStorage.setItem("provide_ACCESS_TOKEN", "")
        window.localStorage.setItem("provide", '')
        window.localStorage.setItem("userinfo",JSON.stringify({
          "profile_url": "",
          "nickname":"",
          "email":""
        }))
        // navigate('/')
        window.location.href = 'http://127.0.0.1:3000/'
      } catch (error) {
        console.log(error)
      }
    }else if(provide === "github" && provide_ACCESS_TOKEN && tmt_ACCESS_TOKEN){
      try {
        const Response = await getGithubLogout(provide_ACCESS_TOKEN, tmt_ACCESS_TOKEN)
        console.log(Response?.status)
        // localStroage에 있는 토큰과 정보 초기화
        window.localStorage.setItem("tmt_ACCESS_TOKEN", "")
        window.localStorage.setItem("provide_ACCESS_TOKEN", "")
        window.localStorage.setItem("provide", '')
        window.localStorage.setItem("userinfo",JSON.stringify({
          "profile_url": "",
          "nickname":"",
          "email":""
        }))
        // navigate('/')
        window.location.href = 'http://127.0.0.1:3000/'
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])


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
          {/* <img src={profileUrl} alt="" /> */}
        {/* <div>
          <p>{nickname}</p>
          <p>{email}</p>
        </div> */}
        <div>
          <p 
            className='logoutP'
            onClick={() => {handleGetLogout()}}
            >
            로그아웃
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
