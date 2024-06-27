import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
// import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/tarot/tarotSlice'
import { trueIsSelectcomplete, falseIsSelectcomplete } from '../../store/slices/tarot/tarotSlice'
import "./ReadCard1.css"
import TarotNumbers from "./TarotNumber.json"
// import {getTarotCard, getReadTarotByGemini} from "../../axios/TarotCardAxios"
import {TarotNumbersType} from "../types/explainCards/explainCardsType"
import {getTokenRefresh} from "../../axios/homeAxios"
import Cookies from 'js-cookie';

// import { RxTriangleDown } from "react-icons/rx";


function ReadCard1() {
  const navigate = useNavigate()
  const count = useAppSelector((state) => state.tarot.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  const tarotNumbersDict = TarotNumbers as TarotNumbersType;
  const isClickGoRead = useAppSelector((state) => state.tarot.isClickGoRead)
  
  const [isClickCSL, setIsClickCSL] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>("운세 선택하기")
  const [consulValue, setConsulValue] = useState<string>("")
  const [randomTarotNumbers, setRandomTarotNumbers] = useState<number[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [selectedCardsName, setSelectedCardsName] = useState<string[]>([])
  const [clickMix, setClickMix] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)  // 로그인 여부 확인

  useEffect(() => {
    // handleGetTarotCard()
    dispatch(falseIsSelectcomplete())
    // 토큰이 있는지 확인
    const tmt_token = Cookies.get('tmt_token')
    const tmt_refresh_token = Cookies.get('tmt_refresh_token')
    if(tmt_token && tmt_refresh_token){
      getTokenRefresh(tmt_refresh_token)
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }, [])

  // custom select태그
  const handleOptionClick = (event :any) => {
    // const selectedValue = event.currentTarget.getAttribute('data-value');
    // 필요하다면 selectedValue를 사용하여 추가 작업 수행
    setSelectedOption(event.currentTarget.textContent);
    setConsulValue("")
  };
  // 타로카드 무작위 30개 뽑기 Fisher-Yates 알고리즘
  const handleRandomTarot = () => {
    // 0부터 77까지의 숫자를 배열로 생성
    const numbers = Array.from({ length: 78 }, (_, i) => i);

    // Fisher-Yates 알고리즘을 이용해 배열을 랜덤하게 섞음
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // 섞인 배열에서 앞의 30개의 숫자를 선택
    const randomNumbers = numbers.slice(0, 30);

    // 상태를 업데이트
    setRandomTarotNumbers(randomNumbers);
  };

  function handleMix() {
    setClickMix(true)
    // 섞을 때 카드를 비움.
    // setSelectedCards([])
    // 카드를 섞어서 30개 뽑음
    handleRandomTarot()

    // 각 카드에 대한 무작위 회전 시간 설정
    const cards = document.querySelectorAll('.drawcard-img');
    cards.forEach((card:any) => {
      // 0.1초에서 0.5초 사이의 무작위 지속 시간 생성
      const randomDuration = `${Math.random() * 0.4 + 0.1}s`;
      // CSS 변수 --rotate-duration을 무작위 지속 시간으로 설정
      card.style.setProperty('--rotate-duration', randomDuration);
  
      // 카드 회전 클래스 추가
      card.classList.add('drawcard-img-rotate');
  
      // 애니메이션 종료 후 클래스 제거
      card.addEventListener('transitionend', () => {
        card.classList.remove('drawcard-img-rotate');
      }, { once: true }); // 이벤트 리스너가 한 번 실행되고 자동으로 제거되도록 설정
    });
    setTimeout(() => {
      setClickMix(false)
    }, 550);
  }

  const goReadTarot = () => {
    if(selectedCards.length == 5 && selectedOption !== "운세 선택하기"){
      dispatch(trueIsSelectcomplete())
      // console.log(selectedOption)
      // console.log(selectedCards)
      navigate(`/fortune/read`, {state:{selectedOption, selectedCards, consulValue, selectedCardsName}})
    }
  }

  useEffect(() => {
    handleRandomTarot();

    return () => {}
  }, [])


  const [Loptions, setLoptions] = useState(['신년운', '애정운', '금전운', '학업운', '직장운', '건강운', '오늘의 운세'])
  const CustomSelect = () => {
    return(
      <ul className={`custom-select-large-option-list ${isClickCSL ? "CSLOL-active": ""}`}
        onClick={() => {
          setIsClickCSL(false)
        }}
      >
        {Loptions.map((v1, i1) => (
          <li key={i1} value={v1} className="custom-select-large-option"
            onClick={(e) => {handleOptionClick(e)}}
          >{v1}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className="ReadCard1">
      {/* 보고싶은 운세 */}
      <div className="RC-left">
        <div className="RC-left-select">
          <h2>지금 내가 생각하는 일은 어떻게 될까요?<br/>타로와 함께 고민을 덜어봐요.</h2>
          <div className='CS-div'>
            <p>보려는 운세를 선택해 주세요.</p>
            <div className="custom-select-large">
              <div className="custom-select-vision" tabIndex={0}
                onClick={() => {
                  setIsClickCSL(!isClickCSL)
                }}
              >
                <p className="custom-select-text" tabIndex={0}>{selectedOption}</p>
              </div>
              <CustomSelect/>
            </div>
          </div>
          <div className='consultation-div'>
            <p>고민의 내용을 적어주세요. (100자 이내)</p>
            <textarea
              // readOnly={selectedCards.length? true: false}
              className={`input-consultation`}
              rows={4}
              cols={50}
              placeholder="예시) 오늘하루는 기분 좋은 일이 있을까요?"
              value={consulValue}
              onChange={(e) => setConsulValue(e.target.value)}
              maxLength={100}
            ></textarea>
          </div>
        </div>
        
        <div className='RC-left-explain'>
          <h2>타로밀크티의 타로 소개</h2>
          <p>상담사별로 뒤죽박죽이던 카드 해석을 인공지능을 통해 일관된 해석으로 고민을 해결해봐요.</p>
          <p className={isLogin == false? "pRedBlink": ""}>먼저, 로그인을 해주세요.</p>
          <p>고민하고 있는 주제를 선택하고 고민 내용을 100자 이내로 적어주세요.</p>
          <p>이제 78장의 카드 중 30장이 보여질 거에요. 이 중에서 5장의 카드를 뽑아주세요.</p>
          <p>카드를 뽑은 후, '운세보기' 버튼을 클릭해주세요.</p>
          <p>카드를 섞고 싶다면, '카드 섞기' 버튼을 눌러서 카드를 섞은 후 다시 선택해보세요.</p>
          {/* <p>한 번 카드를 선택하고 나면 더 이상 카드를 섞을 수 없으며, 주제와 고민을 변경할 수 없습니다.</p> */}
        </div>
      </div>
      {/* 타로 카드 뽑기 */}
      <div className='RC-right'>
        <div className={`drawcard-div`}>
          {randomTarotNumbers.map((num, i) => (
            <div
              tabIndex={0}
              key={i}
              className={`drawcard-img-div`}
              onClick={() => {
                if( isLogin === true && selectedCards.length < 5 && !selectedCards.includes(num) ){
                  setSelectedCards((prev) => [...prev, num])
                  const name = tarotNumbersDict.cards[num]
                  setSelectedCardsName((prev) => [...prev, name])
                }else{
                  alert("로그인을 먼저 해주세요.")
                }
              }}
            >
              <img 
              tabIndex={0}
              key={i}
              className={`drawcard-img ${selectedCards.includes(num)?"drawcard-img-selected":""}`}
              src={process.env.PUBLIC_URL+"/images/tarotCardBack.png"} alt={`타로카드뒷면`}
            />
            </div>
          ))}
        </div>
        {/* 카드섞기 및 운세보기 버튼 */}
        <div className='RC-right-btn-div'>
          <div className={`RC-right-btn RC-right-btn-mix`}
            tabIndex={0}
            onClick={() => {
              if(!clickMix && selectedCards.length === 0){
                handleMix()
              }
            }}
          >
            <p>카드섞기</p>
          </div>
          <div className={`RC-right-btn ${selectedCards.length == 5 && selectedOption !== "운세 선택하기" ? "RC-right-btn-read": ""}`}
            tabIndex={0}
            onClick={() => {
              if(isLogin === true){
                goReadTarot()
              }else{
                alert('로그인을 먼저 해주세요.')
              }
              
            }}
          >
            <p>운세보기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadCard1;
