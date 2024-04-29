import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'



function CardExplain() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="CardExplain">
      <h1>CardExplain</h1>
    </div>
  );
}

export default CardExplain;
