import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import { useAppSelector, useAppDispatch } from './store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from './store/slices/counter/counterSlice'


function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <button onClick={() => {dispatch(increment())}}>+</button>
        <button onClick={() => {dispatch(decrement())}}>-</button>
        <button onClick={() => {dispatch(incrementByAmount(5))}}>+</button>
        <button onClick={() => {dispatch(decrementByAmount(5))}}>-</button>
        <p>{count}</p>
      </div>
    </div>
  );
}

export default App;
