import React, {useEffect, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./CardExplain.css"
import { IoIosArrowDroprightCircle } from "react-icons/io";

interface CardCgType {
  "majorCg": {"id":number, "cardName":string}[];
  // "minorCategory": string[],
  "minorCg": { 
    "WANDS" : minorCgType[],
    "CUPS" : minorCgType[],
    "SWORDS" : minorCgType[],
    "PENTACLES" : minorCgType[]
  }
}

interface minorCgType {
  "id":number, "cardName": string
}

const minorCategories: (keyof CardCgType['minorCg'])[] = ['WANDS', 'CUPS', 'SWORDS', 'PENTACLES'];

const cardCg:CardCgType = {
  "majorCg" : [
    {"id": 0, "cardName" : '0번 The Fool'}, {"id": 1, "cardName" :'1번 The Magician'}, {"id": 2, "cardName" :'2번 The High Priestess'}, {"id": 3, "cardName" :'3번 The Empress'}, {"id": 4, "cardName" :'4번 The Emperor'}, {"id": 5, "cardName" :'5번 The Hierophant'},
    {"id": 6, "cardName" :'6번 The Lovers'}, {"id": 7, "cardName" :'7번 The Chariot'}, {"id": 8, "cardName" :'8번 Strength'}, {"id": 9, "cardName" :'9번 The Hermit'}, {"id": 10, "cardName" :'10번 Wheel of Fortune'}, {"id": 11, "cardName" :'11번 Justice'},
    {"id": 12, "cardName" :'12번 The Hanged Man'}, {"id": 13, "cardName" :'13번 Death'}, {"id": 14, "cardName" :'14번 Temperance'}, {"id": 15, "cardName" :'15번 The Devil'}, {"id": 16, "cardName" :'16번 The Tower'}, {"id": 17, "cardName" :'17번 The Star'},
    {"id": 18, "cardName" :'18번 The Moon'}, {"id": 19, "cardName" :'19번 The Sun'}, {"id": 20, "cardName" :'20번 Judgement'}, {"id": 21, "cardName" :'21번 The World'},
  ],
  "minorCg" : {
    "WANDS" : [
      { "id": 22, "cardName": "ACE of WANDS" },
      { "id": 23, "cardName": "2 of WANDS" },
      { "id": 24, "cardName": "3 of WANDS" },
      { "id": 25, "cardName": "4 of WANDS" },
      { "id": 26, "cardName": "5 of WANDS" },
      { "id": 27, "cardName": "6 of WANDS" },
      { "id": 28, "cardName": "7 of WANDS" },
      { "id": 29, "cardName": "8 of WANDS" },
      { "id": 30, "cardName": "9 of WANDS" },
      { "id": 31, "cardName": "10 of WANDS" },
      { "id": 32, "cardName": "PAGE of WANDS" },
      { "id": 33, "cardName": "KNIGHT of WANDS" },
      { "id": 34, "cardName": "QUEEN of WANDS" },
      { "id": 35, "cardName": "KING of WANDS" },
    ],
    "CUPS" : [
      { "id": 36, "cardName": "ACE of CUPS" },
      { "id": 37, "cardName": "2 of CUPS" },
      { "id": 38, "cardName": "3 of CUPS" },
      { "id": 39, "cardName": "4 of CUPS" },
      { "id": 40, "cardName": "5 of CUPS" },
      { "id": 41, "cardName": "6 of CUPS" },
      { "id": 42, "cardName": "7 of CUPS" },
      { "id": 43, "cardName": "8 of CUPS" },
      { "id": 44, "cardName": "9 of CUPS" },
      { "id": 45, "cardName": "10 of CUPS" },
      { "id": 46, "cardName": "PAGE of CUPS" },
      { "id": 47, "cardName": "KNIGHT of CUPS" },
      { "id": 48, "cardName": "QUEEN of CUPS" },
      { "id": 49, "cardName": "KING of CUPS" },
    ],
    "SWORDS" : [
      { "id": 50, "cardName": "ACE of SWORDS" },
      { "id": 51, "cardName": "2 of SWORDS" },
      { "id": 52, "cardName": "3 of SWORDS" },
      { "id": 53, "cardName": "4 of SWORDS" },
      { "id": 54, "cardName": "5 of SWORDS" },
      { "id": 55, "cardName": "6 of SWORDS" },
      { "id": 56, "cardName": "7 of SWORDS" },
      { "id": 57, "cardName": "8 of SWORDS" },
      { "id": 58, "cardName": "9 of SWORDS" },
      { "id": 59, "cardName": "10 of SWORDS" },
      { "id": 60, "cardName": "PAGE of SWORDS" },
      { "id": 61, "cardName": "KNIGHT of SWORDS" },
      { "id": 62, "cardName": "QUEEN of SWORDS" },
      { "id": 63, "cardName": "KING of SWORDS" },
    ],
    "PENTACLES" : [
      { "id": 64, "cardName": "ACE of PENTACLES" },
      { "id": 65, "cardName": "2 of PENTACLES" },
      { "id": 66, "cardName": "3 of PENTACLES" },
      { "id": 67, "cardName": "4 of PENTACLES" },
      { "id": 68, "cardName": "5 of PENTACLES" },
      { "id": 69, "cardName": "6 of PENTACLES" },
      { "id": 70, "cardName": "7 of PENTACLES" },
      { "id": 71, "cardName": "8 of PENTACLES" },
      { "id": 72, "cardName": "9 of PENTACLES" },
      { "id": 73, "cardName": "10 of PENTACLES" },
      { "id": 74, "cardName": "PAGE of PENTACLES" },
      { "id": 75, "cardName": "KNIGHT of PENTACLES" },
      { "id": 76, "cardName": "QUEEN of PENTACLES" },
      { "id": 77, "cardName": "KING of PENTACLES" },
    ]
  }
}

function CardExplain() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [test1, setTest1] = useState()
  const [isSidebar, setIsSidebar] = useState<boolean>(false)
  // onClick={() => {setIsSidebar(false)}}

  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  // const [isCategoryHA,setIsCategoryHA] = useState<boolean>(false);
  const [bh, setBh] = useState<number>(0)
  const [cgPosition, setCgPosition] = useState<number>(0)

  function categoryHeight(cu_posit:number) {
    if(browserWidth >= 1024){
      let tmpBh = browserHeight - (145.13 - cu_posit)
      let tmpCgposiont = 145.13 - cu_posit
      if(cu_posit >= 145.13){
        tmpBh = browserHeight
        tmpCgposiont = 0
      }
      setBh(tmpBh)
      setCgPosition(tmpCgposiont)
    }else if(browserWidth >= 481){
      let tmpBh = browserHeight - (115.41 - cu_posit)
      let tmpCgposiont = 115.41 - cu_posit
      if(cu_posit >= 115.41){
        tmpBh = browserHeight
        tmpCgposiont = 0
      }
      setBh(tmpBh)
      setCgPosition(tmpCgposiont)
    }
  }

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    categoryHeight(position)
  };

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
      categoryHeight(scrollPosition)
    }

    window.addEventListener('resize', handleResize);
  
    handleResize();
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


  return (
    <div className="CardExplain">
      {/* 선택부분 */}
      <div 
        onMouseLeave={()=>{setIsSidebar(false)}}
        style={{height: `${bh}px`, 
        top:`${cgPosition}px`
      }}
        className={`card-category-contain
          ${isSidebar ? "card-category-active" : ""}
        `}
      >
        {/* 큰거 1 */}
        <div className="card-certi1">
          <h1>타로에대해서</h1>
        </div>
        {/* 큰거 2 */}
        <div className="card-certi1">
          <h1>메이저 아르카나</h1>
        </div>
        {/* 메이저 아르카나 카드 */}
        <div className='CgContain'>
          {cardCg.majorCg.map((v1, i1) => (
            <div className="card-certi2" key={i1}>
              <h3>{v1.cardName}</h3>
            </div>
          ))}
        </div>
        {/* 큰거 3 */}
        <div className="card-certi1">
          <h1>마이너 아르카나</h1>
        </div>
        {/* 마이너 아르카나 카드 */}
          {minorCategories.map((v2, i2) => (
            <div className='CgContain' key={i2}>
              <div className="card-certi2">
                <h2>{v2}</h2>
              </div>
              {cardCg.minorCg[v2].map((v3, i3) => (
                <div className="card-certi3" key={i3}>
                  <h3>{v3.cardName}</h3>
                </div>
              ))}
            </div>
          ))}
      </div>
      
      {/* 카드 표현 부분 */}
      <div className={`card-explain-body`}>
        
        <div className={`card-explain-cateogry-open ${isSidebar ? "card-explain-cateogry-open-none": ""}`}
          onClick={() => {
            setIsSidebar(!isSidebar)
          }}
        >
          <IoIosArrowDroprightCircle className='card-explain-cateogry-open-icon'/>
        </div>
        <div><p>{scrollPosition} {browserHeight}</p></div>
        <div><p>{bh}</p></div>
        <div><h1 style={{margin:"600px 0px 0px 0px"}}>{scrollPosition}</h1></div>
        <div><h1 style={{margin:"0px 0px 600px 0px"}}>{bh}</h1></div>
      </div>
    </div>
  );
}

export default CardExplain;
