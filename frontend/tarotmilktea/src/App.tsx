import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';

function App() {

  return (
    <Routes>
      <Route element={<Navbar/>}>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
