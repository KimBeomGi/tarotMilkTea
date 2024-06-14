import React, {useEffect, useState} from 'react';

import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
// import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { trueIsSelectcomplete, falseIsSelectcomplete } from '../../store/slices/tarot/tarotSlice'
import ReadCard2Data from "./ReadCard2Data.json"
import "./ReadCard2.css"
import {getTarotCard, getReadTarotByGemini, saveTarotResult} from "../../axios/TarotCardAxios"

import TarotNumbers from "./TarotNumber.json"
import {TarotNumbersType} from "../types/explainCards/explainCardsType"
import {GeminiAnsewrType, SaveTarotResultType} from "../types/readFortune/fortuneReadType"
import Cookies from 'js-cookie';

function ReadCard2() {
  // const { cardId } = useParams()
  const location = useLocation();
  const selectedOption:string = location.state?.selectedOption;
  const consulValue:string = location.state?.consulValue;
  const selectedCards:number[] = location.state?.selectedCards;
  const selectedCardsName:string[] = location.state?.selectedCardsName;
  
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const isClickGoRead = useAppSelector((state) => state.tarot.isClickGoRead)

  const tmpData = ReadCard2Data
  const tarotNumbersDict = TarotNumbers as TarotNumbersType;
  const [cardTitle,setCardTitle] = useState<string|undefined>(undefined)
  const tmpMessage = tmpData.message
  const [isReceiveGemini, setIsReceiveGemini] = useState<boolean>(false)
  const [geminiAnswer, setGeminiAnswer] = useState<GeminiAnsewrType>()
  const [isSaveAnswer, setIsSaveAnswer] = useState<boolean>(false)
  
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
        <img className='loadingIcon' src="/loadingicon.png" alt="로딩" />
        
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
      const response = await getReadTarotByGemini(sendData)
      setIsReceiveGemini(true)
      if(response){
        setGeminiAnswer(response?.data.gemini_answer)
      }
    } catch (error) {
      alert('풀이에 실패했어요...😥 다음에 다시 시도해주세요.')
      console.error(error)
    }
  }

  // Gemini 데이터 저장하기 
  const handleSaveTarotResult = async () => {
    // console.log('handleSaveTarotResult 실행')
    const tmt_token = Cookies.get('tmt_token')
    if(geminiAnswer && tmt_token && selectedCards){
      let sendData:SaveTarotResultType = {
        "subject" : selectedOption,
        "consulValue" : consulValue || "고민내용 미입력",
        "selectedCards" : selectedCards,
        "selectedCardsName" : selectedCardsName,
        "geminiAnswer" : geminiAnswer,
        "tmt_token" : tmt_token
      }
      try {
        const reresponse = await saveTarotResult(sendData)
        if(reresponse?.status == 200){
          setIsSaveAnswer(true)
        }
      } catch (error) {
        alert('저장에 실패했어요...😥 다음에 다시 시도해주세요.')
      }
    }else{
      alert('저장 할 수 없어요...😥 다음에 다시 시도해주세요.')
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
    let interval: NodeJS.Timeout
    
    if(isClickGoRead){
      interval = setInterval(() => {
        handleRandomLoading()
      }, 3000)

      handleGetReadTarotByGemini().then(() => {
        clearInterval(interval)
      })
      
    }else{}
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
                <div className='saveBtn'>
                  <span 
                    onClick={() => {
                      if(!isSaveAnswer){
                        handleSaveTarotResult()
                      }else{
                        alert("이미 저장되었어요🃏")
                      }
                    }}
                  >저장하기</span>
                </div>
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
