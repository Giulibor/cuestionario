import React from "react"
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../components/questionMO.css'
import { UserContext } from "../../context/UserContext";

const QuestionAddText = () => {
    const { userName } = useContext(UserContext);
    const { id } = useParams();
    const { categoryId } = useParams();
    const [questions, setQuestions] = useState("");
    const [options, setOptions] = useState([]);
    const [count, setCount] = useState(0);
    const [countOptions, setCountOptions] = useState(0);
    const [questionType, setQuestionType] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => {
                setCount(data.length);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => {
                setCount(data.length);
            });
    }, []);

    const handleText = () => {

        fetch(`http://localhost:3000/questions?text=${questions}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    return;
                } else {
                    fetch('http://localhost:3000/questions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: count + 1,
                            categoryId: id,
                            text: questions,
                            type: "multiple",
                        })
                    })
                }
            });
        setQuestions("");
    };
    return (
        <div>
            <div className="login-wrapper">
                <div className="login-container">
                    <h1>Add your Question</h1>
                    <input
                        placeholder="Ingrese la pregunta"
                        value={questions}
                        onChange={e => setQuestions(e.target.value)}
                    />
                    <br></br>
                    <button className="Create-button" onClick={() => handleText()}>Create</button>
                    <br></br>
                    <Link to={`/QuestionPanel/${id}`}>
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
export default QuestionAddText;