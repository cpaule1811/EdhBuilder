import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import { requestDecklist, menuStatus, loginStatus, sidebarStatus } from './reducers'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({ requestDecklist, menuStatus, loginStatus, sidebarStatus })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
