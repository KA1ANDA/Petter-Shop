import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';


AOS.init();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
