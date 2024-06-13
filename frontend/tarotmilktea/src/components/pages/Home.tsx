import React, {useEffect, useRef, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./Home.css"

import { FaBeer } from "react-icons/fa";
import { ReactComponent as Books } from "../../assets/images/books.svg";
import { ReactComponent as Coins } from "../../assets/images/coins.svg";
import { ReactComponent as Like } from "../../assets/images/like.svg";
import { ReactComponent as Suitcase } from "../../assets/images/suitcase.svg";
import { ReactComponent as TMT_Logo } from "../../assets/images/TMT_Logo.svg";

import Cookies from 'js-cookie';

function Home() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const textHead1Ref = useRef(null)
  const taliLogoRef = useRef(null)
  const [isVisibleHead1, setIsVisibleHead1] = useState<boolean>(false)
  const [isVisibleLogo, setIsVisibleLogo] = useState<boolean>(false)
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
      // setBrowserHeight(window.innerHeight - 132);
      // setBrowserHeight(window.innerWidth * 11 / 24);
    };
  
    // 컴포넌트가 마운트될 때도 초기 높이 설정
    handleResize();
  
    window.addEventListener("resize", handleResize);
    
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  ////////////////////////////////
  // 스크롤 위치 찾기
  
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const calculateOpacityFortuneFig = (index:number):number => {
    const initialOpacityStart = (2 + index) * browserHeight;
    let opacity = ((scrollPosition - initialOpacityStart) / browserHeight) * 1;
    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;
    return opacity;
  };

  const calculateOpacity = (index:number) => {
    const initialOpacityStart = (index) * browserHeight
    let opacity = ((scrollPosition - initialOpacityStart) / browserHeight) * 1;
    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;
    return opacity
  }
  
  // useRef 이용해서 제일 첫 헤드와 끝 로고를 애니메이션 효과
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === textHead1Ref.current) { // 첫 번째 헤드 요소인지 확인
          setIsVisibleHead1(entry.isIntersecting);
        } else if (entry.target === taliLogoRef.current) { // 로고 요소인지 확인
          setIsVisibleLogo(entry.isIntersecting);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  
    // 각 요소를 관찰자에 등록
    if (textHead1Ref.current) {
      observer.observe(textHead1Ref.current);
    }
    if (taliLogoRef.current) {
      observer.observe(taliLogoRef.current);
    }
  
    // 컴포넌트 언마운트 시 관찰 종료
    return () => {
      if (textHead1Ref.current) {
        observer.unobserve(textHead1Ref.current);
      }
      if (taliLogoRef.current) {
        observer.unobserve(taliLogoRef.current);
      }
    };
  }, [textHead1Ref, taliLogoRef])

  return (
    <div className="Home">
      {/* <div style={{width:`${browserWidth}px`, height:`${browserHeight}px`}} className='HomeImage1'> */}
      {/* home의 첫 화면 */}
      <div className='HomeImage1'>
        <div className='HomeText1-contain'>
          <div>
            <h1 className={`HomeText1 ${isVisibleHead1 ? 'text-appear-ani' : ''}`} ref={textHead1Ref}>차 한잔과 함께 미래를 읽어볼까요?</h1>
          </div>
        </div>
      </div>
      {/* 여기는 sticky */}
      <div className='sticky-div'>
        <div className='HomeImage2'></div>
        
        <div className='HomeText2-contain'>
          <h2 className={`HomeText2`} style={{ opacity: calculateOpacityFortuneFig(-1.8) }}>미래에 어떤 일이 있을지 궁금하지 않으신가요?</h2>
        </div>
        
        <div className='kinds-contain'>
          <div className='HomeText3-contain'>
            <h2 className={`HomeText3`} style={{ opacity: calculateOpacityFortuneFig(-0.5) }}>지금 생각 하는 일은 어떻게 될까요?</h2>
          </div>
          <div className='fortune-ex-contain'>
            <div className='fortune-ex' style={{ opacity: calculateOpacityFortuneFig(0) }}>
              <p>연애</p>
              <span>
                <Like className='fortune-ex-fig'/>
              </span>
            </div>
            <div className='fortune-ex' style={{ opacity: calculateOpacityFortuneFig(1) }}>
              <p>학업</p>
              <span>
                <Books className='fortune-ex-fig'/>
              </span>
            </div>
            <div className='fortune-ex' style={{ opacity: calculateOpacityFortuneFig(2) }}>
              <p>직장</p>
              <span>
                <Suitcase className='fortune-ex-fig'/>
              </span>
            </div>
            <div className='fortune-ex' style={{ opacity: calculateOpacityFortuneFig(3) }}>
              <p>금전</p>
              <span>
                <Coins className='fortune-ex-fig'/>
              </span>
            </div>
          </div>
          <div className='HomeText4-contain'>
            <h2 className={`HomeText4`} style={{ opacity: calculateOpacityFortuneFig(4) }}>당신이 생각 하는 모든 것을 이곳에서</h2>
          </div>
        </div>
      </div>
      {/* 여기는 스크롤 끝 화면 */}
      <div className='HomeImage3'>
        <div className='HomeText5-contain' style={{ opacity: calculateOpacity(7.65) }}>
          <h2 className={`HomeText5`} >차 한 잔의 여유와 함께</h2>
        </div>
        <div className='HomeText6-contain' style={{ opacity: calculateOpacity(7.695) }}>
          <h2 className={`HomeText6`}>타로밀크티에서 여러분의 걱정을 덜어드릴게요</h2>
        </div>
        <span><TMT_Logo className={`TMT-logo ${isVisibleLogo ? 'text-appear-ani2' : ''}`} ref={taliLogoRef}/></span>
      </div>
    </div>
  );
}

export default Home;