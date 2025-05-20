import React from "react"
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../components/questionMO.css'
import { UserContext } from "../../context/UserContext";

const QuestionMO = () => {
    const { userName } = useContext(UserContext);
    const { id } = useParams();
    const { categoryId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [selected, setSelected] = useState(null);

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
        fetch(`http://localhost:3000/options?questionId=${id}`)
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                setOptions([]);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:3000/answers?questionId=${id}&username=${userName}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const answerText = data[0].answer;
                    const selectedOption = options.find(opt => opt.text === answerText);
                    if (selectedOption) setSelected(selectedOption.id);
                }
            });
    }, [id, userName, options]);

    const handleOptionClick = (option) => {
        setSelected(option.id);

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
                            answer: option.text
                        })
                    });
                } else {
                    fetch('http://localhost:3000/answers', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: userName,
                            questionId: id,
                            answer: option.text
                        })
                    });
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
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>
                                <button className="option-button" style={{ backgroundColor: selected === option.id ? "green" : "black" }}
                                    onClick={() => handleOptionClick(option)}>
                                    {option.text}
                                </button>
                            </li>
                        ))}
                    </ul>
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
export default QuestionMO;