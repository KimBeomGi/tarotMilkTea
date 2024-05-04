import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./CardExplainBody1.css"


function CardExplainBody1() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="CardExplainBody1">
      <h1>타로에대해서</h1>
    </div>
  );
}

export default CardExplainBody1;
