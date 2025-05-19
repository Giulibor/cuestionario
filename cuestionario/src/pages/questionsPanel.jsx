import React from "react"
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const QuestionPanel = () => {
  const { id } = useParams();
  const [questions,setQuestions] = useState([]);
  
   useEffect(() => {
  fetch(`http://localhost:3000/questions?categoryId=${id}`)
    .then(response => response.json())
    .then(data => setQuestions(data))
    .catch(error => {
      console.error('Error al obtener los datos:', error);
      setQuestions([]);
    });
}, [id]);

  return(
    <div>
      <div className="login-wrapper">
        <div className="login-container">
            <h1>Questions</h1>
                <ul>
                    {questions.map((question, index) => (
                    <li key={index}>
                        <Link to={ question.type === "multiple"? `/QuestionMO/${id}/${question.id}`: question.type === "text"? `/QuestionText/${id}/${question.id}`: "#"}>
                            <button>{question.text}</button>
                        </Link>
                    </li>
                    ))}
                </ul>
                <br></br>
                <Link to={"/home"}>
                    <button className="Back-button">Back</button>
                </Link>
                <br></br>
                <Link to={"/"}>
                    <button className="exit-button">Exit</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
export default QuestionPanel;