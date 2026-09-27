import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const navigate=useNavigate(); const [user,setUser]=useState(null);
  useEffect(()=>{const x=localStorage.getItem("user"); if(x)setUser(JSON.parse(x)); else navigate("/login");},[navigate]);
  if(!user)return <p>Loading...</p>;
  const logout=()=>{localStorage.removeItem("user");navigate("/login");};
  return <div className="container"><div className="card wide">
    <h1>Online Banking System</h1><h2>Welcome, {user.name}</h2>
    <p><b>Email:</b> {user.email}</p><p><b>Account:</b> {user.accountNumber}</p>
    <div className="balance">₹{user.balance}</div>
    <div className="grid">
      <button onClick={()=>navigate("/deposit")}>Deposit</button>
      <button onClick={()=>navigate("/withdraw")}>Withdraw</button>
      <button onClick={()=>navigate("/transfer")}>Transfer Money</button>
      <button onClick={()=>navigate("/transactions")}>Transaction History</button>
    </div>
    <button className="danger" onClick={logout}>Logout</button>
  </div></div>;
}
