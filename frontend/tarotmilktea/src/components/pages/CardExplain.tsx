import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./CardExplain.css"



function CardExplain() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="CardExplain">
      {/* 선택부분 */}
      <div className="card-category"></div>
      {/* 카드 표현 부분 */}
      <div className="card-explain-body"></div>
    </div>
  );
}

export default CardExplain;
