import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
axios.defaults.baseURL = 'https://barmans-dwell-backend.vercel.app';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
