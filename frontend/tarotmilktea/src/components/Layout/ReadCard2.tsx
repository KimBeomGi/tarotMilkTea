import React, {useState} from 'react';

import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import ReadCard2Data from "./ReadCard2Data.json"

function ReadCard2() {
  // const { cardId } = useParams()
  const tmpData = ReadCard2Data
  const tmpMessage = tmpData.message
  const location = useLocation();
  const selectedCards:number[] = location.state?.selectedCards;
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  return (
    <div className="ReadCard2">
      <div>
        {selectedCards.map((num,i) => (
          <div>
            <h1>{selectedCards[i]}</h1>
          </div>
        ))}
        
      </div>
      <div>
        <p>{tmpMessage}</p>
      </div>
    </div>
  );
}

export default ReadCard2;
