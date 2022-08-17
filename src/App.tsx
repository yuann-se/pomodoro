import './global.scss';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from './components/Main';
import { RecoilRoot } from 'recoil';
import { Statistics } from './components/Statistics';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='statistics' element={<Statistics />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default hot(App);
