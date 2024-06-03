import React, {useEffect, useState} from 'react';

import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import ReadCard2Data from "./ReadCard2Data.json"
import "./ReadCard2.css"

import TarotNumbers from "./TarotNumber.json"
import {TarotNumbersType} from "../types/explainCards/explainCardsType"

function ReadCard2() {
  // const { cardId } = useParams()
  const tmpData = ReadCard2Data
  const tarotNumbersTyped = TarotNumbers as TarotNumbersType;
  const [cardTitle,setCardTitle] = useState<string|undefined>(undefined)

  const tmpMessage = tmpData.message
  const location = useLocation();
  const selectedCards:number[] = location.state?.selectedCards;
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 계속 진행할 수는 없으니까, 나중에 store에 있는 값을 이용해야함.
  }, [])
  return (
    <div className="ReadCard2">
      <div className="container">
        <div className={"selected-div"}>
          {selectedCards.map((num,i) => (
            <div key={i} className='cardShow'>
              <img 
                className={"showImg"} 
                src={`https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard${num}.jpg`}
                alt={process.env.PUBLIC_URL+"/images/tarotCardBack.png"}
              />
              <h2>
                {/* {selectedCards[i]} */}
                {tarotNumbersTyped.cards[num]}
              </h2>
            </div>
          ))}
        </div>
        <div>
          <p>{tmpMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default ReadCard2;
