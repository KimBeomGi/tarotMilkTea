import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';
import Board from './components/pages/Board';
import TarotShop from './components/pages/TarotShop';
import CardExplain from './components/pages/CardExplain';
import FortuneRead from './components/pages/FortuneRead';
import CardExplainBody1 from './components/layout/CardExplainBody1';
import CardExplainBody2 from './components/layout/CardExplainBody2';
import ReadCard1 from './components/layout/ReadCard1';
import ReadCard2 from './components/layout/ReadCard2';
import KakaoRedirection from './components/layout/KakaoRedirection'
import GithubRedirection from './components/layout/GithubRedirection'
import GoogleRedirection from './components/layout/GoogleRedirection'
import MyPage from './components/layout/MyPage'
import ResultTarotList from './components/layout/ResultTarotList'
import ResultTarotDetail from './components/layout/ResultTarotDetail'


import Test from './components/pages/Test'

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
          <Route path='' element={<ReadCard1 />} />
          {/* <Route path=':cardId' element={<ReadCard2 />} /> */}
          <Route path='read' element={<ReadCard2 />} />
        </Route>
        <Route path='/board' element={<Board />} />
        <Route path='/tarotshop' element={<TarotShop />} />
        <Route path='/mypage' element={<MyPage />}/>
        <Route path='/tarot/results' element={<ResultTarotList />}/>
        <Route path='/tarot/result' element={<ResultTarotDetail />}/>
      </Route>
      <Route path='/login' element={<Login />}/>
      
      {/* 카카오 로그인을 위해 /social/kakao로 진입시 */}
      <Route path='/social/kakao' element={<KakaoRedirection />} />
      {/* github 로그인을 위해 /social/github로 진입시 */}
      <Route path='/social/github' element={<GithubRedirection />} />
      {/* google 로그인을 위해 /social/google로 진입시 */}
      <Route path='/social/google' element={<GoogleRedirection />} />
      
      
      {/* <Route path='/test' element={<Test />} /> */}
      
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
