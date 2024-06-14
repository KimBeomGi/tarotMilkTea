import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import "./Test.css"

function Test() {
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  return (
    <div className="TestBody">
      <div>
        <h1>기본 폰트 ㄱ 부터 ㅎ font a to z</h1>
        <p>기본 폰트 ㄱ 부터 ㅎ font a to z</p>
      </div>
      <div className='here1'>
        <h1>적용 폰트1 ㄱ 부터 ㅎ font a to z</h1>
        <p>적용 폰트1 ㄱ 부터 ㅎ font a to z</p>
      </div>
      <div className='here2'>
        <h1>적용 폰트2 ㄱ 부터 ㅎ font a to z</h1>
        <p>적용 폰트2 ㄱ 부터 ㅎ font a to z</p>
      </div>
    </div>
  );
}

export default Test;
