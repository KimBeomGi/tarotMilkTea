import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./CardExplainBody2.css"


function CardExplainBody2() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="CardExplainBody2">
      <h1>카드설명</h1>
      <div><h1>카드부분</h1></div>
      <div><h1>설명부분</h1></div>
    </div>
  );
}

export default CardExplainBody2;
