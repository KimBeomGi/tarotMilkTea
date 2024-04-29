import React, {useState} from 'react'

import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {


  return (
    <div className="Navbar">
      <nav>
        <div className='nav-logo'>
          <div></div>
          <Link to="/"><img src="images/tarotMilkTea_logo.png" alt="" className='logo' /></Link>
          <span><Link to="/login" className='login'>로그인</Link></span>
        </div>
        <div className='nav-bar'>
          <span><Link to="/">홈</Link></span>
          <span><Link to="/explain">카드설명</Link></span>
          <span><Link to="/fortune">운세보기</Link></span>
          <span><Link to="/board">게시판</Link></span>
        </div>
      </nav>
      <Outlet/>
    </div>
  );
}

export default Navbar;
