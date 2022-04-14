import React from 'react';
import ReactDOM from 'react-dom';
// store 제공 범위를 정의하기 위한 Wrapper
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
// store import
import store from './store/index'

// Provider에서 어떤 store를 연결할 것인지 명시
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
