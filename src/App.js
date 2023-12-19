import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Game from './components/Game';
import PageLoad from './routes/PageLoad';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/pageLoad" element={<PageLoad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



