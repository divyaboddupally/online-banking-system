import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"" });
  const change = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (e) { alert(e.response?.data?.message || "Registration failed"); }
  };
  return <div className="card"><h1>Online Banking</h1><h2>Register</h2>
    <form onSubmit={submit}>
      <input name="name" placeholder="Full Name" onChange={change} required />
      <input name="email" type="email" placeholder="Email" onChange={change} required />
      <input name="phone" placeholder="Phone" onChange={change} required />
      <input name="password" type="password" placeholder="Password" onChange={change} required />
      <button>Register</button>
    </form>
    <button className="secondary" onClick={()=>navigate("/login")}>Already have an account? Login</button>
  </div>;
}
