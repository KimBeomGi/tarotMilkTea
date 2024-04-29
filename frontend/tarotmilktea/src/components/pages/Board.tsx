import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'



function Board() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="Board">
      <h1>Board</h1>
    </div>
  );
}

export default Board;
