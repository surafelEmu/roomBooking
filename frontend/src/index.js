import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css'

import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react' ;

import {store , persistor} from './store' ;
import AlertTemplate from 'react-alert-template-basic'
import {positions, transitions , Provider as AlertProvider} from 'react-alert' ;

const options = {
  timeout: 5000 ,
  position: positions.BOTTOM_CENTER ,
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options}>
    {/* <PersistGate persistor= {persistor}>  */}
    <App />
    {/* </PersistGate> */}
    </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
