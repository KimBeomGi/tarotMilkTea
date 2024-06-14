import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'

function ResultTarotList() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  return (
    <div className="ResultTarotListBody">
      <div>
        <h1>홈페이지</h1>
      </div>
      <div>
        <button onClick={() => {dispatch(increment())}}>+</button>
        <button onClick={() => {dispatch(decrement())}}>-</button>
        <hr />
        <span>{incrementN}씩 증가</span>
        <button onClick={() => {dispatch(incrementByAmount(incrementN))}}>+</button>
        <hr />
        <span>{discountN}씩 증가</span>
        <button onClick={() => {dispatch(decrementByAmount(discountN))}}>-</button>
        <hr />
        <p>{count}</p>
      </div>
      <div>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/Login">로그인</Link>
        </p>
      </div>
    </div>
  );
}

export default ResultTarotList;
