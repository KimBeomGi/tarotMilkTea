// "big" : ["오늘의 운세", "연애운", "금전운", "건강운",  "학업운", "직업운", "신년운"],
import React, {useEffect, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import FortuneReadData from "./FortuneReadData.json"

import { IoIosArrowDroprightCircle } from "react-icons/io";
import "./FortuneRead.css"
import {FortuneReadDataType} from "../types/readFortune/fortuneReadType"


function FortuneRead() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [fortuneReadData, setFortuneReadData] = useState<FortuneReadDataType>(FortuneReadData)
  const [istest, setIstest] = useState<boolean>(false)
  const [largeCategory, setLargeCategory] = useState<string[]|null>(null)
  const [smallCategoryList, setSmallCategoryList] = useState<(string | number)[][][] | null>(null)

  useEffect(() => {
    const initialLargeCategories = Object.values(fortuneReadData.fortuneType).map(type => type.name);
    const initialLargeCategories2 = Object.values(fortuneReadData.fortuneType).map(type => type.kinds);
    console.log(initialLargeCategories2)
    setLargeCategory(initialLargeCategories)
    setSmallCategoryList(initialLargeCategories2)
  }, [])

  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [sidebarH, setSidebarH] = useState<number>(window.innerHeight)
  const [cgTopPosition, setCgTopPosition] = useState<number>(0)
  const [isSmartPhone, setIsSmartPhone] = useState<boolean>(false)

  const [tabActive1, setTabActive1] = useState<boolean[]>([]);

  // 사이즈에 따른 사이드바 조정 함수
  const handleSidebarTopPosition = () => {
    let tmpTopPosi
    let tmpSidebarH
    if(1024 <= browserWidth){
      // 스마트폰
      setIsSmartPhone(false)
      // 사이드바 위치 잡기
      tmpTopPosi = 145.13 - scrollPosition
      if(tmpTopPosi <= 0){
        tmpTopPosi = 0
      }
      setCgTopPosition(tmpTopPosi)
      // 사이드바 길이 조정
      tmpSidebarH = browserHeight - (145.13 - scrollPosition)
      if(tmpSidebarH >= browserHeight){
        tmpSidebarH = browserHeight
      }
      setSidebarH(tmpSidebarH)
    }else if(481 <= browserWidth){
      // 스마트폰
      setIsSmartPhone(false)
      // 사이드바 위치 잡기
      tmpTopPosi = 115.41 - scrollPosition
      if(tmpTopPosi <= 0){
        tmpTopPosi = 0
      }
      setCgTopPosition(tmpTopPosi)
      // 사이드바 길이 조정
      tmpSidebarH = browserHeight - (115.41 - scrollPosition)
      if(tmpSidebarH >= browserHeight){
        tmpSidebarH = browserHeight
      }
      setSidebarH(tmpSidebarH)
    }else{
      // 스마트폰
      setIsSmartPhone(true)
      // 사이드바 위치 잡기
      tmpTopPosi = 49.36 - scrollPosition
      if(tmpTopPosi <= 0){
        tmpTopPosi = 0
      }
      setCgTopPosition(tmpTopPosi)
      // 사이드바 길이 조정
      tmpSidebarH = browserHeight - (49.36 - scrollPosition)
      if(tmpSidebarH >= browserHeight){
        tmpSidebarH = browserHeight
      }
      setSidebarH(tmpSidebarH)
    }
  }

  

  //  브라우저 사이즈 변경시
  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleSidebarTopPosition()
  }, [browserWidth, browserHeight, scrollPosition])
  
  const handleLargeCategoryClick = (index: number) => {
    setTabActive1(prev => {
      const newActiveState = [...prev];
      newActiveState[index] = !newActiveState[index];
      return newActiveState;
    });
  }
  

  return (
    <div className="FortuneRead">
      {/* 카테고리 창 */}
      {/* <div 
        style={{
          height: `${sidebarH}px`, 
          top:`${cgTopPosition}px`
        }}
        className={`fR-cg-contain ${istest? "fR-cg-contain-active" : ""}`}
        onMouseLeave={() => {
          setIstest(false)
          setTabActive1([])
        }}
      >
        {largeCategory?.map((v1, i1) => (
          <div className={`fR-cg`} key={i1}>
            <div
              tabIndex={0}
              className={`fR-cg-largeCg`}
              onClick={() => handleLargeCategoryClick(i1)}
            >
              <p>{v1}</p>
            </div>
            {smallCategoryList?.[i1]?.map((v2, i2) => (
              <div key={i2}
                tabIndex={0}
                className={`fR-cg-smallCg ${tabActive1[i1] ? "fR-cg-smallCg-active" : ""}`}
              >
                <p>{v2[0]}</p>
              </div>
            ))}
          </div>
        ))}
      </div> */}
      {/* 카테고리 버튼 */}
      {/* <div className={`fR-cateogry-open ${istest ? "fR-cateogry-open-none": ""}`}
        onClick={() => {
          setIstest(!istest)
        }}
      >
        <IoIosArrowDroprightCircle className='fR-cateogry-open-icon'/>
      </div> */}
      <Outlet/>
    </div>
  );
}

export default FortuneRead;
