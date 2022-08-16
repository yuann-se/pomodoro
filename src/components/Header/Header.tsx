import React from 'react';
import styles from './header.module.scss';
import { Link } from "react-router-dom";
import logo from '../../img/logo.jpg';
import { StatsIcon } from '../../icons';

export function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>

        <Link to='statistics' className={styles.statistics}>
          <StatsIcon />
          <span>Статистика</span>
        </Link>
      </div>
    </header>
  );
}
