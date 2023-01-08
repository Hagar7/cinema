import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import AuthContextProvider from './Components/Context/AuthContext';
import MediaContextProvider from './Components/Context/MediaContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <MediaContextProvider>
        <App />
        </MediaContextProvider>
    </AuthContextProvider>
  
);


reportWebVitals();
