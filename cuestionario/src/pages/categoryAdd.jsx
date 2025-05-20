import React from "react"
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../components/questionMO.css'
import { UserContext } from "../../context/UserContext";

const CategoryAdd = () => {
    const { userName } = useContext(UserContext);
    const { id } = useParams();
    const { categoryId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        fetch(`http://localhost:3000/categories`)
          .then(res => res.json())
          .then(data => {
            setCount(data.length);
          });
      }, []);
    
    const handleText = () => {

    fetch(`http://localhost:3000/categories?name=${categoryName}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          fetch(`http://localhost:3000/categories?name=${categoryName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: categoryName
            })
          })
        } else {
          fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: (count + 1).toString(),
                name: categoryName
            })
          })
        }
      });
  };
    return (
        <div>
            <div className="login-wrapper">
                <div className="login-container">
                    <h1>Add your category</h1>
                    <input
                        placeholder="Ingrese el nombre de su categoria"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <br></br>
                    <button className="Create-button" onClick={() => handleText()}>Create</button>
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
export default CategoryAdd;