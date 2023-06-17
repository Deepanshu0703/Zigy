// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './components/page1';
import Page2 from './components/page2';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <h1>React Checklist App</h1>
        <Routes>
          <Route path="/" exact element={<Page1 />} />
          <Route path="/2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
