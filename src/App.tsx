import React from 'react';
import './global.scss';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from './components/Main';

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='statistics' />
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default hot(App);
