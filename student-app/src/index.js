import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import axios from 'axios';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import TokenAuthenticator from './components/TokenAuthenticator';

axios.defaults.baseURL = process.env.BACKEND_URL || 'http://localhost:3001';

const stytch = new StytchUIClient(process.env.REACT_APP_STYTCH_PUBLIC_TOKEN);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StytchProvider stytch={stytch}>
        <TokenAuthenticator>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </TokenAuthenticator>
    </StytchProvider>
);

reportWebVitals();
