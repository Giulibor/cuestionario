import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Question from './pages/questionText';
import QuestionPanel from './pages/questionsPanel';
import QuestionMO from './pages/questionMo';
import QuestionText from './pages/questionText';
import QuestionAddText from './pages/questionAddText';
import QuestionAddMO from './pages/questionAddMo';
import CategoryAdd from './pages/categoryAdd';          


function App() {  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/QuestionAddText/:id" element={<QuestionAddText/>} />
        <Route path="/QuestionMO/:categoryId/:id" element={<QuestionMO/>} />
        <Route path="/QuestionPanel/:id" element={<QuestionPanel/>} />
        <Route path="/QuestionText/:categoryId/:id" element={<QuestionText/>} />
        <Route path="/CategoryAdd/" element={<CategoryAdd/>} />
        <Route path="/QuestionAddMO/:id" element={<QuestionAddMO/>} />
      </Routes>
    </div>
  );
}

export default App;