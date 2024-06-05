import React, {useEffect, useState} from 'react';

import { Outlet, Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

// import tarotCard0 from '../../assets/images/tarot/tarotCard0.png'

import "./CardExplainBody2.css"
import TarotNumbers from "./TarotNumber.json"
import {TarotNumbersType} from "../types/explainCards/explainCardsType"

import {getTarotDetail} from "../../axios/TarotCardAxios"

const explain_data = [
  "타로 카드의 주요 아르카나 중 하나인 'The Fool'(바보) 카드는 새로운 시작, 무한한 가능성, 순수한 열정, 그리고 모험을 상징합니다. 이 카드는 여정의 시작을 의미하며, 삶에서 발견, 경험, 그리고 성장을 위한 준비를 나타냅니다. 'The Fool'은 무지와 무모함의 부정적인 측면이 아니라, 순수한 마음과 세상에 대한 무한한 호기심을 상징합니다.",
  "'The Fool' 카드의 이미지에서, '바보'는 절벽 끝에 서 있는 모습으로 묘사됩니다. 이는 알려지지 않은 것에 대한 무한한 가능성과 모험을 상징합니다. 그의 발 아래에는 작은 개가 있어, 충성과 보호의 상징으로, 새로운 경험을 향한 그의 여정에서 그를 돕는 역할을 합니다. '바보'의 옷은 화려하고, 무거운 짐을 지니지 않은 채로 여행을 떠남으로써 세상에 대한 순수한 열정과 마음을 열고 새로운 것을 받아들일 준비가 되어 있음을 나타냅니다.",
  "'The Fool' 카드가 나타날 때, 그것은 새로운 시작, 새로운 경험, 그리고 새로운 모험이 기다리고 있음을 암시합니다. 이 카드는 우리에게 두려움을 떨치고 알려지지 않은 것을 향해 첫 발을 내딛을 용기를 주며, 삶의 여정에서 새로운 가능성을 탐색할 것을 격려합니다.",
  "또한, 'The Fool'은 자유로운 영혼과 자유로움의 중요성을 상기시킵니다. 계획되지 않은 여행이나 예상치 못한 경로를 통해 우리는 자신에 대해 더 많이 배우고, 삶을 더 풍부하게 만들 수 있습니다. '바보'는 우리에게 세상에 대한 호기심을 잃지 말고, 삶의 모험을 즐기며, 자신만의 길을 찾아나가라고 권합니다.",
  "요약하자면, 'The Fool' 카드는 새로운 시작, 무한한 가능성, 그리고 삶의 여정에서의 성장과 발견을 상징합니다. 이 카드는 우리에게 미지의 세계를 탐험할 용기와 열정을 주며, 삶의 모험을 즐기라는 메시지를 전달합니다."
]
const data2 = [
  ["0", "무한한 가능성", "새로운 시작", "순환", "여정의 시작"], 
  ["자유", "모험", "무한한 잠재력", "순수함", "미지의 탐험"]
]

  
// chat gpt에게 다음처럼 말함
// Please explain the symbol and meaning of The Fool, one of the major cards of tarot cards, in Korean in around 2000 characters.
// Please make the form as below. Cut off each paragraph, grab it with the index of the array, and write it.
// ```
// ["1st paragraph", "2nd paragraph", "3rd paragraph", "n" paragraph]
// ```

// 타로 카드의 메이저 카드 중 하나인 The Fool 이 가지는 수비학적 의미와 회화적 의미를 각각 5개~10개의 단어로 알려줘.
// 양식은 아래처럼 알려줘.
// ```
// [["수비학적 의미의 단어1","수비학적 의미의 단어2", ... , "수비학적 의미의 단어n"], ["회화적 의미의 단어1","회화적 의미의 단어2", ... , "회화적 의미의 단어n"]]
// ```

function CardExplainBody2() {
  const { cardId } = useParams()
  const tarotNumbersTyped = TarotNumbers as TarotNumbersType;

  const [cardTitle,setCardTitle] = useState<string|undefined>(undefined)
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [browerWidth, setBrowerWidth] = useState<number>(window.innerWidth)
  const [browerHeight, setBrowerHeight] = useState<number>(window.innerHeight)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [bH, setBH] = useState<number>(0)

  const [numMean, setNumMean] = useState<string[]>([])
  const [picMean, setPicMean] = useState<string[]>([])
  const [explainD, setExplainD] = useState<string[]>([])

  // 수비학적 의미와 회화적 의미에 대해서
  // const [handledData2, setHandledData2] = useState<string[]>([])

  function getCardTitle(cardId: string): string | undefined {
    return tarotNumbersTyped.cards[cardId as keyof TarotNumbersType["cards"]];
  }
  // cardId를 받아서 해당 카드의 제목을 설정하는 함수
  function settingCardTitle(cardId: string): void {
    const title = getCardTitle(cardId);
    if (title !== undefined) {
      setCardTitle(title)
    } 
  }


  const handleGetTarotDetail = async() => {
    const numericCardId = parseInt(cardId!, 10);
    if (isNaN(numericCardId)) {
      console.error('cardId cannot be converted to a number')
      return
    }
    try {
      const response = await getTarotDetail(numericCardId)
      console.log(response?.data)
      if (response){
        setNumMean(response.data.numerology_means.join(', '))
        setPicMean(response.data.picture_means.join(', '))
        setExplainD(response.data.card_explain)
      }
      
      
    } catch (error) {
      console.log('데이터를 불러올 수 없습니다.')
    }
      

  }


  // useEffect(() => {
    // if(cardId != undefined){
    //   settingCardTitle(cardId)
    // }
    // handleGetTarotDetail()
  // }, [])
  useEffect(() => {
    if(cardId != undefined){
      settingCardTitle(cardId)
      handleGetTarotDetail()
    }
  },[cardId])


  // 브라우저 사이즈
  useEffect(() => {
    const handleResize = () => {
      setBrowerWidth(window.innerWidth)
      setBrowerHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return() => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const countCardImagePosition = () => {
    let cEB2LHeight
    if(1024 <= browerWidth){
      cEB2LHeight = (browerHeight - 145.13 + scrollPosition)
      
    }else if(480 <= browerWidth){
      cEB2LHeight = (browerHeight - 115.41 + scrollPosition)
    }else{
      cEB2LHeight = (browerHeight - 49.36 + scrollPosition)
    }
    if(cEB2LHeight >= browerHeight){
      cEB2LHeight = browerHeight
    } 
    setBH(cEB2LHeight)
  }
  

  // 스크롤 위치 가져오기
  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // cardExplainBody2-left 높이 구하기
  useEffect(() => {
    countCardImagePosition()
  }, [browerWidth, browerHeight, scrollPosition])

  return (
    <div className="CardExplainBody2">
      {/* 왼쪽 */}
      <div 
        style={{
          height: `${bH}px`,
        }}
        className="cardExplainBody2-left"
      >
        <div className='CEB2-left-cardImage'>
          <img 
            src={`https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard${cardId}.jpg`}
            alt={`tarot card ${cardId}`}
          />
          <h1>{parseInt(cardId!,10)<22?<span>{cardId}번</span>:''} {cardTitle}</h1>
        </div>
      </div>
      {/* 오른쪽 */}
      <div className="cardExplainBody2-right">
        <div className={`cEB2-right-card-title`}>
          <h1>카드가 가지고 있는 의미</h1>
        </div>
        <div className={`cEB2-right-card-title`}>
          <div 
            className={`
              cEB2-right-card-width100
              cEB2-right-card-gradient-bg
            `}
          >
            <h2>수비학적 의미</h2>
          </div>
          <div 
            className={`
              cEB2-right-card-width100
            `}
          >
            <p>{numMean}</p>
          </div>
        </div>
        <div className={`cEB2-right-card-title`}>
          <div 
            className={`
              cEB2-right-card-width100
              cEB2-right-card-gradient-bg
            `}
          >
            <h2>회학적의미</h2>
          </div>
          <div 
            className={`
              cEB2-right-card-width100
            `}
          >
            <p>{picMean}</p>
          </div>
        </div>
        <div className={`cEB2-right-card-title`}>
          <div 
            className={`
              cEB2-right-card-width100
              cEB2-right-card-gradient-bg
            `}
          >
            <h2>카드에 대한 부가 설명</h2>
          </div>
          <div className={`cEB2-right-explain-symbol`}>
            {explainD.map((v, i) => (
              <p key={i}>{v}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardExplainBody2;
