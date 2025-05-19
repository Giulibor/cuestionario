import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Question from './pages/questionText';
import QuestionPanel from './pages/questionsPanel';
import QuestionMO from './pages/questionMo';
import QuestionText from './pages/questionText';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/QuestionMO/:categoryId/:id" element={<QuestionMO/>} />
        <Route path="/QuestionPanel/:id" element={<QuestionPanel/>} />
        <Route path="/QuestionText/:categoryId/:id" element={<QuestionText/>} />
      </Routes>
    </div>
  );
}

export default App;