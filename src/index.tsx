import React from 'react';
import ReactDOM from 'react-dom';
import './app/styling/styles.scss';
import './app/styling/visualizer.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
