import './global.scss';
import styles from './app.module.scss';
import { hot } from 'react-hot-loader/root'
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Statistics } from './components/Statistics';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, useLocation } from 'react-router';

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

function App() {

  const location = useLocation();

  return (
    <>
      <Header />

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames={transitionClassesStatistics}
        >
          <Switch location={location}>
            <Route exact path='/statistics' children={<Statistics />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames={transitionClassesMain}
        >
          <Switch location={location}>
            <Route exact path='/' children={<Main />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default hot(App);
