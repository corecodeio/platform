import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.baseURL;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <SnackbarProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </SnackbarProvider>
);

reportWebVitals();
