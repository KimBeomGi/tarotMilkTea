import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";

function Navbar() {


  return (
    <div className="Navbar">
      <nav>
        <span><Link to="/">1번째</Link></span>
        <span><Link to="/Login">2번째</Link></span>
        <span><a href="https:www.naver.com">3번째</a></span>
        <span><a href="https:www.google.com">4번째</a></span>
        <span>5번째</span>
        <span>6번째</span>
        <span>7번째</span>
        <span>8번째</span>
        <span>9번째</span>
      </nav>
      <hr />
      <hr />
      <Outlet/>
    </div>
  );
}

export default Navbar;
