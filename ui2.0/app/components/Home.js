import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        {/* <img src="./resources/Welcome page.svg" alt="sample.gif" /> */}
        {<img src="./resources/sample.gif" alt="sample.gif" />}
        <Link to={routes.COUNTER}>to Counter</Link>
        <img
          src="./resources/Password registration demo.svg"
          alt="sample.gif"
        />
      </div>
    );
  }
}
