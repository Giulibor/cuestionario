import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import '../components/questionMO.css';
import { UserContext } from "../../context/UserContext";

const QuestionAddMO = () => {
    const { userName } = useContext(UserContext);
    const { id } = useParams();
    const { categoryId } = useParams();
    const [questions, setQuestions] = useState("");
    const [optionsCount, setOptionsCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => setQuestionCount(data.length));
        fetch(`http://localhost:3000/options`)
            .then(res => res.json())
            .then(data => setOptionsCount(data.length));
    }, []);

    const handleText = async () => {

        const res = await fetch(`http://localhost:3000/questions?text=${questions}`);
        const data = await res.json();
        if (data.length > 0) {
            return;
        }

        const questionRes = await fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: questionCount + 1,
                categoryId: id,
                text: questions,
                type: "multiple",
            })
        });

        if (!questionRes.ok) {
            alert("Error al crear la pregunta");
            return;
        }

        const optionsArr = [option1, option2, option3, option4];
        for (let i = 0; i < optionsArr.length; i++) {
            await fetch('http://localhost:3000/options', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: optionsCount + i + 1,
                    questionId: questionCount + 1,
                    text: optionsArr[i],
                })
            });
        }
        setQuestions("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
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
                    <input
                        placeholder="Ingrese la Opcion 1"
                        value={option1}
                        onChange={e => setOption1(e.target.value)}
                    />
                    <input
                        placeholder="Ingrese la Opcion 2"
                        value={option2}
                        onChange={e => setOption2(e.target.value)}
                    />
                    <input
                        placeholder="Ingrese la Opcion 3"
                        value={option3}
                        onChange={e => setOption3(e.target.value)}
                    />
                    <input
                        placeholder="Ingrese la Opcion 4"
                        value={option4}
                        onChange={e => setOption4(e.target.value)}
                    />
                    <br></br>
                    <button className="Create-button" onClick={handleText}>Create</button>
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
    );
};

export default QuestionAddMO;