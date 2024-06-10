import React, {useEffect, useState} from 'react'

import { Outlet, Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { FaBars } from "react-icons/fa6";
import { useAppSelector } from '../../store/hooks';


function Navbar() {
  // const profileUrl = useAppSelector((state) =>state.account.profileUrl)
  // const nickname = useAppSelector((state) =>state.account.nickname)
  const [profileUrl, setProfileUrl] = useState("")
  const [nickname, setNickname] = useState("")
  const [clickHamburger, setClickHamburger] = useState<boolean>(false)
  const [isSPhone, setIsSPhone] = useState<boolean>(false)
  const navigate = useNavigate();

  function treatSPhoneNavbar():void {
    if(isSPhone){
      setClickHamburger(!clickHamburger)
    }
  }

  const getUserInfo = () =>{
    const userInfoString = window.localStorage.getItem("userinfo")
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString)
        setNickname(userInfo.nickname)
        setProfileUrl(userInfo.profile_url)
      } catch (error) {
        console.error("Failed to parse userinfo from localStorage:", error)
      }
    } else {
      console.log("No userinfo found in localStorage")
    }
  }
  
  useEffect(() => {
    getUserInfo()
  },[])


  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth
      
      if (currentWindowWidth > 480) {
        setClickHamburger(true)
        setIsSPhone(false)
      } else {
        setClickHamburger(false)
        setIsSPhone(true)
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // 컴포넌트가 마운트될 때 초기 실행을 위해 추가

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 컴포넌트 마운트 및 언마운트 시에만 실행

  return (
    <div className="Navbar">
      <nav className='navbar-Contain'>
        <div className='nav-logo'>
          <div className="nav-logo1">
            <Link to="/"><img src={process.env.PUBLIC_URL+"/images/tarotMilkTea_logo.png"} alt="" className='main-logo' /></Link>
          </div>
          {profileUrl !== "" && nickname !== ""
          ?
            <div
              className="nav-logo2"
              onClick={()=>{navigate('mypage')}}
              >
              <img src={profileUrl} alt="" className='profileImg'/>
              <span className='nickname'>{nickname}</span>
            </div>
          :
            <div className="nav-logo2">
              <Link to="/login">로그인</Link>
            </div>
          }
          
          <div className="nav-toggleBtn" onClick={() => {
            setClickHamburger(!clickHamburger)
          }}>
            <FaBars />
          </div>
        </div>
        <div 
          className={`
          nav-bar ${clickHamburger ? 'nav-bar-active' : ''}
          `}
        >
          <Link to="/" className={`nav-bar1 ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
            treatSPhoneNavbar()
          }}>홈</Link>
          <Link to="/explain" className={`nav-bar2 ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
            treatSPhoneNavbar()
          }}>카드설명</Link>
          <Link to="/fortune" className={`nav-bar3 ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
            treatSPhoneNavbar()
          }}>운세보기</Link>
          {/* <Link to="/board" className={`nav-bar4 ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
            treatSPhoneNavbar()
          }}>게시판</Link> */}
          {/* css 차후 변경 */}
          <Link to="/tarotshop" className={`nav-bar4 ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
            treatSPhoneNavbar()
          }}>주변 점집</Link>
          {profileUrl !== "" && nickname !== ""
          ? 
            <Link to="/mypage" className={`nav-bar5 nav-bar-login ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
              treatSPhoneNavbar()
            }}>마이페이지</Link>
          :
            <Link to="/login" className={`nav-bar5 nav-bar-login ${clickHamburger ? 'nav-bar-link-active' : ''}`} onClick={() => {
              treatSPhoneNavbar()
            }}>로그인</Link>
          }
        </div>
        
      </nav>
      {/* <div className='test'></div> */}
      <div>
        <Outlet/>
      </div>

    </div>
  );
}

export default Navbar;
