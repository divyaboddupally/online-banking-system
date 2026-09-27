import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const submit = async e => {
    e.preventDefault();
    try {
      const r=await axios.post("http://localhost:5000/api/users/login",{email,password});
      localStorage.setItem("user",JSON.stringify(r.data.user));
      navigate("/dashboard");
    } catch(e){ alert(e.response?.data?.message || "Login failed"); }
  };
  return <div className="card"><h1>Online Banking</h1><h2>Login</h2>
    <form onSubmit={submit}>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button>Login</button>
    </form>
    <button className="secondary" onClick={()=>navigate("/register")}>Create New Account</button>
  </div>;
}
