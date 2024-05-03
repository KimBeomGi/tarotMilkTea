import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import "./FortuenRead.css"


function FortuenRead() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="FortuenRead">
      <h1>FortuenRead</h1>

      <div className='divCOntain'>
        <div className="divTesting">
          <div className='divTesting1'>
            <h1>태그하나</h1>
          </div>
          <div className='divTesting1'>
            <h1>태그둘</h1>
          </div>
          <div className='divTesting1'>
            <h1>태그셋</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FortuenRead;
