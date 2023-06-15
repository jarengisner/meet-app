import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';
import * as atatus from 'atatus-spa';
atatus.config('95e8786a34c9471a95b3fd3e891593e5').install();

const root = document.getElementById('root');
render(<App />, root);

serviceWorkerRegistration.register();

reportWebVitals();
