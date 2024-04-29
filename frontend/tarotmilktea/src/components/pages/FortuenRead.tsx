import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'



function FortuenRead() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="FortuenRead">
      <h1>FortuenRead</h1>
    </div>
  );
}

export default FortuenRead;
