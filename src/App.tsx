import './global.scss';
import styles from './app.module.scss';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Statistics } from './components/Statistics';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, useLocation } from 'react-router';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { appIntervals, ICount, isMainPageState, stopsCountState, timeOnPauseState, totalPomodorosState, totalTimeState } from './store';
import { useEffect } from 'react';

const transitionClassesMain = {
  enter: styles['mainRoute-enter'],
  enterActive: styles['mainRoute-enter-active'],
  exit: styles['mainRoute-exit'],
  exitActive: styles['mainRoute-exit-active']
};

const transitionClassesStatistics = {
  enter: styles['statsRoute-enter'],
  enterActive: styles['statsRoute-enter-active'],
  exit: styles['statsRoute-exit'],
  exitActive: styles['statsRoute-exit-active']
};

const clearStorage = (data: ICount, func: SetterOrUpdater<ICount>) => {
  let props = Object.keys(data);
  let updatedData: ICount = {};
  if (props.length > 21) {
    for (let i = props.length - 21; i <= props.length; ++i) {
      updatedData[props[i]] = data[props[i]];
    }
    func(updatedData);
  }
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {

  const location = useLocation();
  const workInterval = useRecoilValue(appIntervals).work;

  const [isMainPage,] = useRecoilState<boolean>(isMainPageState);

  const [totalTime, setTotalTime] = useRecoilState<ICount>(totalTimeState);
  const [totalPauseTime, setTotalPauseTime] = useRecoilState<ICount>(timeOnPauseState);
  const [totalPomodoros, setTotalPomodoros] = useRecoilState<ICount>(totalPomodorosState);
  const [totalStops, setTotalStops] = useRecoilState<ICount>(stopsCountState);

  useEffect(() => {
    clearStorage(totalTime, setTotalTime);
    clearStorage(totalPauseTime, setTotalPauseTime);
    clearStorage(totalPomodoros, setTotalPomodoros);
    clearStorage(totalStops, setTotalStops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Заполняем LS моковыми данными за 3 недели
  useEffect(() => {
    if (!localStorage.getItem('mockDataLoaded')) {
      const month = new Date().getMonth();
      const day = new Date().getDate();

      const generateData = () => {
        const totalTm = randomNumber(0, 6000);
        const stops = totalTm < 300 ? 0 : randomNumber(0, 10);
        const pauseTm = totalTm < 300 ? 0 : Math.floor(randomNumber(0, totalTm * .5));
        const poms = totalTm < 120 ? 0 : Math.floor(randomNumber(1, totalTm / workInterval * .7));
        return { totalTm, pauseTm, stops, poms }
      }

      for (let i = 1; i < 21; ++i) {
        let storeData = JSON.parse(localStorage.getItem('recoil-persist') || '{}');
        let data = generateData();

        let dayNum = day - i;
        let period: string = `${month}&${dayNum}`;
        if (dayNum < 1) {
          let lastDay = new Date(2022, month, 0).getDate();
          let monthNum = month === 0 ? 11 : month - 1;
          period = `${monthNum}&${lastDay - Math.abs(dayNum)}`
        }

        localStorage.setItem('recoil-persist',
          JSON.stringify({
            ...storeData,
            totalTime: { ...storeData.totalTime, [period]: data.totalTm },
            timeOnPause: { ...storeData.timeOnPause, [period]: data.pauseTm },
            totalPomodoros: { ...storeData.totalPomodoros, [period]: data.poms },
            stopsCount: { ...storeData.stopsCount, [period]: data.stops }
          }))
      }
      localStorage.setItem('mockDataLoaded', 'true');
    }
  }, [workInterval]);

  return (
    <>
      <Header />

      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames={isMainPage ? transitionClassesMain : transitionClassesStatistics}>
          <Switch location={location}>
            <Route exact path='/' children={<Main />} />
            <Route exact path='/statistics' children={<Statistics />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

    </>
  );
}

export default hot(App);
