import React from 'react';
import './app.global.css';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default hot(App);
