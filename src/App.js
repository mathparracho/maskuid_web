import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Feed } from './pages/feed';
import { NovoPost } from './pages/novopost';
import { Header } from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/post" element={<NovoPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;