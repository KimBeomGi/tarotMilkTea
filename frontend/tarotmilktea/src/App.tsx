import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';
import Board from './components/pages/Board';
import CardExplain from './components/pages/CardExplain';
import FortuneRead from './components/pages/FortuneRead';
import CardExplainBody1 from './components/layout/CardExplainBody1';
import CardExplainBody2 from './components/layout/CardExplainBody2';

function App() {

  return (
    <Routes>
      <Route element={<Navbar/>}>
        <Route path='/' element={<Home />} />
        <Route path='/explain' element={<CardExplain />} >
          <Route path='' element={<CardExplainBody1 />} />
          <Route path=':cardId' element={<CardExplainBody2 />} />
        </Route>
        <Route path='/fortune' element={<FortuneRead />}>
          
        </Route>
        <Route path='/board' element={<Board />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
