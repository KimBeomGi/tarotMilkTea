import React, {useEffect, useState} from 'react';

import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
// import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { trueIsSelectcomplete, falseIsSelectcomplete } from '../../store/slices/tarot/tarotSlice'
import ReadCard2Data from "./ReadCard2Data.json"
import "./ReadCard2.css"
import {getTarotCard, getReadTarotByGemini} from "../../axios/TarotCardAxios"

import TarotNumbers from "./TarotNumber.json"
import {TarotNumbersType} from "../types/explainCards/explainCardsType"
import {GeminiAnsewrType} from "../types/readFortune/fortuneReadType"

function ReadCard2() {
  // const { cardId } = useParams()
  const location = useLocation();
  const selectedOption:string = location.state?.selectedOption;
  const consulValue:string = location.state?.consulValue;
  const selectedCards:number[] = location.state?.selectedCards;
  const selectedCardsName:number[] = location.state?.selectedCardsName;
  
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const isClickGoRead = useAppSelector((state) => state.tarot.isClickGoRead)

  const tmpData = ReadCard2Data
  const tarotNumbersDict = TarotNumbers as TarotNumbersType;
  const [cardTitle,setCardTitle] = useState<string|undefined>(undefined)
  const tmpMessage = tmpData.message
  const [isReceiveGemini, setIsReceiveGemini] = useState<boolean>(false)
  const [geminiAnswer, setGeminiAnswer] = useState<GeminiAnsewrType>()
  
  // 브라우저 사이즈
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)
  

  const handleGetReadTarotByGemini = async () => {
    let sendData = {
      "subject" : selectedOption,
      "concern" : consulValue,
      "selectedCard" : selectedCardsName,
    }
    try {
      console.log(sendData)
      // const response = await getReadTarotByGemini(sendData)
      // console.log(response?.data)
      // console.log(response?.data.gemini_answer)
      // console.log(response?.data.gemini_answer.greeting)
      // console.log(response?.data.gemini_answer.past)
      // console.log(response?.data.gemini_answer.present)
      // console.log(response?.data.gemini_answer.future)
      // console.log(response?.data.gemini_answer.advice)
      // console.log(response?.data.gemini_answer.conclusion)
      // setIsReceiveGemini(true)
      // if(response){
      //   setGeminiAnswer(response?.data.gemini_answer)
      // }
    } catch (error) {
      console.error(error)
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
    // 계속 진행할 수는 없으니까, 나중에 store에 있는 값을 이용해야함.
    // setSelectedOption(selectedOptionFromLocation)
    // setConsulValue(consulValueFromLocation)
    // setSelectedCards(selectedCardsFromLocation)
    if(isClickGoRead){
      console.log('가능')
      handleGetReadTarotByGemini()
    }else{
      console.log('불가능')
    }
    return () => {
      dispatch(falseIsSelectcomplete())
      setIsReceiveGemini(false)
    }
  }, [])

  return (
    <div className="ReadCard2">
      {/* {isClickGoRead
      ? */}
        <div className="container">
          <div className={"selected-div"}>
            {selectedCards.map((num,i) => (
              <div key={i} className='cardShow'>
                <img 
                  className={"showImg"} 
                  src={`https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard${num}.jpg`}
                  alt={process.env.PUBLIC_URL+"/images/tarotCardBack.png"}
                />
                
                { browserWidth > 480 ? 
                  <h2 className='cardNameSize'>
                    {/* {selectedCards[i]} */}
                    {/* {tarotNumbersDict.cards[num]} */}
                    {selectedCardsName[i]}
                  </h2>
                  :
                  <h2></h2>
                }
              </div>
            ))}
          </div>
          { geminiAnswer ? 
            <div>
              <p><strong>고민주제</strong> : {selectedOption}</p>
              <p><strong>고민내용</strong> : {consulValue? consulValue : "고민내용 미입력"}</p>
              
              <p>{geminiAnswer?.greeting}</p>
              <p>{geminiAnswer?.past}</p>
              <p>{geminiAnswer?.present}</p>
              <p>{geminiAnswer?.future}</p>
              <p>{geminiAnswer?.advice}</p>
              <p>{geminiAnswer?.conclusion}</p>
            </div>
          : 
            <div>
              <p className='loadingP'>고민의 답을 해결하기 위한 풀이 중이에요😊</p>
            </div>
          }
          
        </div>
      {/* :
        <div><h1>올바른 방법으로 카드를 선택 후 방문해주세요.</h1></div>
      } */}
      
    </div>
  );
}

export default ReadCard2;
