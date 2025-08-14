// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    try {
      const response = await fetch("https://potential-capybara-4rv5xjx4w4j2q5qv-3001.app.github.dev/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      })
      console.log(response)
      const data = await response.json()
      console.log (data)
      if(response.status==200){
        navigate("/single/1")
      } else{
        alert(data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>Inicio de sesión</h1>
      <form >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" />
        </div>

        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Iniciar sesión</button>
      </form>

    </div>
  );
};
