import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import "./ReadCard1.css"

// import { RxTriangleDown } from "react-icons/rx";


function ReadCard1() {
  const navigate = useNavigate()
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)
  
  const [isClickCSL, setIsClickCSL] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>("운세 선택하기")
  const [consulValue, setConsulValue] = useState<string>("")
  const [randomTarotNumbers, setRandomTarotNumbers] = useState<number[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [clickMix, setClickMix] = useState<boolean>(false)


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

  useEffect(() => {
    handleRandomTarot();
  }, [])

  return (
    <div className="ReadCard1">
      {/* 보고싶은 운세 */}
      <div className="RC-left">
        <div className="RC-left-select">
          <h2>지금 내가 생각하는 일은 어떻게 될까요?<br/>타로와 함께 고민을 덜어봅시다.</h2>
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
              <ul className={`custom-select-large-option-list ${isClickCSL ? "CSLOL-active": ""}`}
                onClick={() => {
                  setIsClickCSL(false)
                }}
              >
                <li value="selectOption1" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >신년운</li>
                <li value="selectOption2" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >애정운</li>
                <li value="selectOption3" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >금전운</li>
                <li value="selectOption4" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >학업운</li>
                <li value="selectOption5" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >직장운</li>
                <li value="selectOption6" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >건강운</li>
                <li value="selectOption7" className="custom-select-large-option"
                  onClick={(e) => {handleOptionClick(e)}}
                >오늘의 운세</li>
              </ul>
            </div>
          </div>
          <div className='consultation-div'>
            <p>고민의 내용을 적어주세요. (100자 이내)</p>
            {/* <input type="text" placeholder="예시) 오늘하루는 기분 좋은 일이 있을까요?"
              className='input-consultation'
            /> */}
            <textarea
              readOnly={selectedCards.length? true: false}
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
          <p>상담사별로 뒤죽박죽이던 카드 해석을 인공지능을 통해 일관된 해석으로 고민을 해결해보세요.</p>
          <p>먼저, 고민하고 있는 주제를 선택하고 고민 내용을 100자 이내로 적어주세요.</p>
          <p>이제 78장의 카드 중 30장이 보여질 거에요. 이 중에서 5장의 카드를 뽑아주세요.</p>
          <p>카드를 뽑은 후, '운세보기' 버튼을 클릭해주세요.</p>
          <p>카드를 섞고 싶다면, '카드 섞기' 버튼을 눌러서 카드를 섞은 후 다시 선택해보세요.</p>
          <p>한 번 카드를 선택하고 나면 더 이상 카드를 섞을 수 없으며, 주제와 고민을 변경할 수 없습니다.</p>
        </div>
      </div>
      {/* 타로 카드 뽑기 */}
      <div className='RC-right'>
        <div className={`drawcard-div`}>
          {randomTarotNumbers.map((num, i) => (
            // <img 
            //   tabIndex={0}
            //   key={i}
            //   className={`drawcard-img drawcard-img-front ${clickMix?"drawcard-img-rotate":""}`} 
            //   src="/images/tarotCardBack.png" alt={`Tarot Card ${num}`}
            //   onClick={() => {
            //     if(selectedCards.length < 5){
            //       setSelectedCards((prev) => [...prev, num])
            //     }
            //   }}
            // />
            <div
              tabIndex={0}
              key={i}
              className={`drawcard-img-div`}
              // src="/images/tarotCardBack.png" alt={`Tarot Card ${num}`}
              // style={{ backgroundImage: `url(/images/tarotCardBack.png)`, backgroundSize: 'cover' }}
              onClick={() => {
                if(selectedCards.length < 5 && !selectedCards.includes(num)){
                  setSelectedCards((prev) => [...prev, num])
                }
              }}
            >
              <img 
              tabIndex={0}
              key={i}
              className={`drawcard-img ${selectedCards.includes(num)?"drawcard-img-selected":""}`}
              src="/images/tarotCardBack.png" alt={`Tarot Card ${num}`}
              onClick={() => {
                // if(selectedCards.length < 5){
                //   setSelectedCards((prev) => [...prev, num])
                // }
              }}
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
          <div className={`RC-right-btn ${selectedCards.length == 5 ? "RC-right-btn-read": ""}`}
            tabIndex={0}
            onClick={() => {
              if(selectedCards.length == 5){
                console.log('운세보기 작!동!')
                navigate(`/fortune/read`, {state:{selectedCards}})
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
