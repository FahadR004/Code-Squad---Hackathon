import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // optional, agar Tailwind ya custom css use kar rahi ho

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
