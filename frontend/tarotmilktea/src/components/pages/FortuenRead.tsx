import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./FortuenRead.css"


function FortuenRead() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [istest, setIstest] = useState<boolean>(false)

  return (
    <div className="FortuenRead">
      <div className={`fR-cg-contain ${istest? "fR-cg-contain-active" : ""}`}>
      </div>
      <div>
        <h1 onClick={() => {
          setIstest(!istest)
        }}>누르면 등장</h1>
      </div>
    </div>
  );
}

export default FortuenRead;
