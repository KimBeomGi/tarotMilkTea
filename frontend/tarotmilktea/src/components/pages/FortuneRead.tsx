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
  

  return (
    <div className="FortuneRead">
      {/* 카테고리 창 */}
      <div 
        className={`fR-cg-contain ${istest? "fR-cg-contain-active" : ""}`}
        onMouseLeave={() => {
          setIstest(false)
        }}
      >
        {largeCategory?.map((v1, i1) => (
          <div className='fR-cg' key={i1}>
            <div className='fR-cg-largeCg'>
              <h1>{v1}</h1>
            </div>
            {smallCategoryList?.[i1]?.map((v2, i2) => (
              <div key={i2}>
                <h2>{v2[0]}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* 카테고리 버튼 */}
      <div className={`fR-cateogry-open ${istest ? "fR-cateogry-open-none": ""}`}
        onClick={() => {
          setIstest(!istest)
        }}
      >
        <IoIosArrowDroprightCircle className='fR-cateogry-open-icon'/>
      </div>
      <Outlet/>
    </div>
  );
}

export default FortuneRead;
