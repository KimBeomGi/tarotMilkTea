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

  // geminiAPI의 대답 생성동안의 나올 대답
  const [loadingMessage] = useState([
    "고민의 답을 해결하기 위한 풀이 중이에요😊",
    "혼자 고민을 앓지말고 여기 털어보세요. 저는 입이 무겁답니다🤫",
    "기다리고 계시면 답이 나와요. 그러니까 뒤로가기와 새로고침은 금지❌",
    "저기압일 때는 고기 앞으로🥩",
    "모든 게 다 잘 될 거예요. 잘 되라 얍🤗!!!",
    "'동트기 전이 가장 어둡다'라는 말이 있어요. 곧 다 잘 될 거예요!",
    "'비 온 뒤에 땅이 굳는다'라는 말이 있어요. 힘듬을 이겨내고, 성장해보자구요!",
    "신비로운 힘이 답변을 준비하고 있어요✨",
    "긍정적인 마음으로 기다리시면, 좋은 결과가 올 거예요!",
    "정말로, 모든 게 다 잘 될 거예요!!!"
  ])
  const [randomIndex, setRandomIndex] = useState<number>(0)
  
  const handleRandomLoading = () => {
    let randIndex = Math.floor(Math.random() * loadingMessage.length);
    if (randIndex === randomIndex) {
      randIndex = (randIndex + 1) % loadingMessage.length;
    }
    setRandomIndex(randIndex);
  }

  // GeminiAPI 받아오는동안 보여질 메세지
  type MessageProps = {
    randomNum: number;
  }
  
  const Message: React.FC<MessageProps> = ({ randomNum }) => {
    const tmpMessage = loadingMessage[randomNum].split('.')
    return (
      <div className="loadingMessageDiv">
        {tmpMessage.map((v1, i1) => (
          <p className='loadingMessage' key={i1}>
            {v1}
          </p>
        ))}
      </div>
    );
  }

  const handleGetReadTarotByGemini = async () => {
    let sendData = {
      "subject" : selectedOption,
      "concern" : consulValue,
      "selectedCard" : selectedCardsName,
    }
    try {
      console.log(sendData)
      const response = await getReadTarotByGemini(sendData)
      console.log(response?.data)
      console.log(response?.data.gemini_answer)
      console.log(response?.data.gemini_answer.greeting)
      console.log(response?.data.gemini_answer.past)
      console.log(response?.data.gemini_answer.present)
      console.log(response?.data.gemini_answer.future)
      console.log(response?.data.gemini_answer.advice)
      console.log(response?.data.gemini_answer.conclusion)
      setIsReceiveGemini(true)
      if(response){
        setGeminiAnswer(response?.data.gemini_answer)
      }
    } catch (error) {
      alert('풀이에 실패했어요...😥 다음에 다시 시도해주세요.')
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
    let interval: NodeJS.Timeout
    
    if(isClickGoRead){

      console.log('가능')
      interval = setInterval(() => {
        handleRandomLoading()
      }, 3000)

      handleGetReadTarotByGemini().then(() => {
        clearInterval(interval)
      })
      
    }else{
      console.log('불가능')
    }
    return () => {
      dispatch(falseIsSelectcomplete())
      setIsReceiveGemini(false)
      if(interval){
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <div className="ReadCard2">
      {isClickGoRead
        ?
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
              <div className='answerDiv'>
                <p className='consulP'><strong>고민주제</strong> : {selectedOption}</p>
                <p className='consulP'><strong>고민내용</strong> : {consulValue? consulValue : "고민내용 미입력"}</p>
                
                <p className='answerP'>{geminiAnswer?.greeting}</p>
                <p className='answerP'>{geminiAnswer?.past}</p>
                <p className='answerP'>{geminiAnswer?.present}</p>
                <p className='answerP'>{geminiAnswer?.future}</p>
                <p className='answerP'>{geminiAnswer?.advice}</p>
                <p className='answerP'>{geminiAnswer?.conclusion}</p>
              </div>
            : 
              <Message randomNum={randomIndex}/>
            }
            
          </div>
        :
          <div>
            <h1>카드를 선택 후 운세보기 버튼을 클릭해주세요.</h1>
            <p>올바른 방법으로 입장하지 않을 시 답변을 확인할 수 없습니다.</p>
          </div>
      }
    </div>
  );
}

export default ReadCard2;
