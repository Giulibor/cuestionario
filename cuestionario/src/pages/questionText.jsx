import React from "react"
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../components/questionMO.css'
import { UserContext } from "../../context/UserContext";

const QuestionText = () => {
  const { userName } = useContext(UserContext);
  const { id } = useParams();
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [save, setSave] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/questions?id=${id}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setQuestions([]);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/answers?questionId=${id}&username=${userName}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const oldAnswer = data[0].answer;
          if (oldAnswer) setSave(oldAnswer);
          if (oldAnswer) setAnswerText(oldAnswer);
        }
      });
  }, [id, userName]);

  const handleText = () => {

    fetch(`http://localhost:3000/answers?questionId=${id}&username=${userName}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          fetch(`http://localhost:3000/answers/${data[0].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userName,
              questionId: id,
              answer: answerText
            })
          }).then(setSave(answerText))
        } else {
          fetch('http://localhost:3000/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userName,
              questionId: id,
              answer: answerText
            })
          }).then(setSave(answerText))
        }
      });
  };

  return (
    <div>
      <div className="login-wrapper">
        <div className="login-container">
          <h1>Question</h1>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                {question.text}
              </li>
            ))}
          </ul>
          <input
            placeholder="Ingrese su respuesta"
            value={answerText}
            onChange={e => setAnswerText(e.target.value)}
          />
          {save && (
            <div className="respuesta-guardada">
              Respuesta guardada: {save}
            </div>
          )}
          <br></br>
          <button className="Save-button" onClick={() => handleText()}>Save</button>
          <br></br>
          <Link to={`/QuestionPanel/${categoryId}`}>
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
export default QuestionText;