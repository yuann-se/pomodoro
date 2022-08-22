import './global.scss';
import styles from './app.module.scss';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Statistics } from './components/Statistics';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, useLocation } from 'react-router';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ICount, stopsCountState, timeOnPauseState, totalPomodorosState, totalTimeState } from './store';
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

function App() {

  const location = useLocation();

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

  return (
    <>
      <Header />

      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames={transitionClassesMain}>
          <Switch location={location}>
            <Route exact path='/' children={<Main />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames={transitionClassesStatistics}>
          <Switch location={location}>
            <Route exact path='/statistics' children={<Statistics />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

    </>
  );
}

export default hot(App);
