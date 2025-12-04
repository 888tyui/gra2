import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import logoSmall from './logosmall.png';
import './index.css';

const ensureFavicon = () => {
  const existingLink = document.querySelector("link[rel='icon']");
  if (existingLink) {
    existingLink.type = 'image/png';
    existingLink.href = logoSmall;
    return;
  }

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logoSmall;
  document.head.appendChild(link);
};

ensureFavicon();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


