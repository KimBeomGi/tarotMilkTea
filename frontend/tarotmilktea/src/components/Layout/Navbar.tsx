import React, {useEffect, useState} from 'react'

import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"
import { FaBars } from "react-icons/fa6";


function Navbar() {
  const [clickHamburger, setClickHamburger] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth;
      if (currentWindowWidth > 480) {
        setClickHamburger(true);
      } else {
        setClickHamburger(false);
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
      <nav>
        <div className='nav-logo'>
          <div className="nav-logo1">
            <Link to="/"><img src="images/tarotMilkTea_logo.png" alt="" className='main-logo' /></Link>
          </div>
          <div className="nav-logo2">
            <Link to="/login">로그인</Link>
          </div>
          <div className="nav-toggleBtn" onClick={() => {
            setClickHamburger(!clickHamburger)
          }}>
            <FaBars />
          </div>
        </div>
        <div className={`nav-bar ${clickHamburger ? 'active' : ''}`} >
          <Link to="/">홈</Link>
          <Link to="/explain">카드설명</Link>
          <Link to="/fortune">운세보기</Link>
          <Link to="/board">게시판</Link>
          <Link to="/login" className='nav-bar-login'>로그인</Link>
        </div>
      </nav>

      <Outlet/>

    </div>
  );
}

export default Navbar;
