import React, {useEffect, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./Home.css"

import { FaBeer } from "react-icons/fa";
import { ReactComponent as Books } from "../../assets/images/books.svg";
import { ReactComponent as Coins } from "../../assets/images/coins.svg";
import { ReactComponent as Like } from "../../assets/images/like.svg";
import { ReactComponent as Suitcase } from "../../assets/images/suitcase.svg";
import { ReactComponent as TMT_Logo } from "../../assets/images/TMT_Logo.svg";


function Home() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight - 132);
    };
  
    // 컴포넌트가 마운트될 때도 초기 높이 설정
    handleResize();
  
    window.addEventListener("resize", handleResize);
    
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <div className="Home">
      <div style={{width:`${browserWidth}px`, height:`${browserHeight}px`}} className='HomeImage1'>
        <h1>차 한잔과 함께 미래를 읽어볼까요?</h1>
      </div>
      {/* <div style={{width:`${browserWidth}px`, height:`${browserHeight}px`}} className='HomeImage2' /> */}
      <div><h1>미래에 어떤 일이 있을지 궁금하지 않으신가요?</h1></div>
      <div><h1>지금 생각 하는 일은 어떻게 될까요?</h1></div>
      <div className='kinds-fortune'>
        <div className='kind-fortune'>
          <p>연애</p>
          <span><Like width="100px" height="100px"/></span>
        </div>
        <div className='kind-fortune'>
          <p>학업</p>
          <span><Books width="100px" height="100px"/></span>
        </div>
        <div className='kind-fortune'>
          <p>직장</p>
          <span><Suitcase width="100px" height="100px"/></span>
        </div>
        <div className='kind-fortune'>
          <p>금전</p>
          <span><Coins width="100px" height="100px"/></span>
        </div>
      </div>
      <div><h1>당신이 생각 하는 모든 것을 이곳에서</h1></div>
      <div><h1>차 한 잔의 여유와 함께</h1></div>
      <div><h1>타로밀크티에서 여러분의 걱정을 덜어드릴게요</h1></div>
      {/* <span><TMT_Logo height={500/5} width={3773/5}/></span> */}

      

    </div>
  );
}

export default Home;