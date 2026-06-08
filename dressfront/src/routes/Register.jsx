import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "../services/auth.services";
import "@/styles/register.css";

export function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });
      console.log(data);
    }catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
    <form onSubmit={handleSubmit} className="register-form">
      <input 
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <input 
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <input 
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
     
    </form>
    
    </div>
  )
  
}

export const Route = createFileRoute("/Register")({
  component: Register,
});
