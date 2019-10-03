import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
import { App } from './app';
//import { store } from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
