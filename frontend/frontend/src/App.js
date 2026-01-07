import { useState } from "react";

const API = "http://localhost:5000/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "User",
        email,
        password
      })
    });

    const data = await res.json();
    setMessage(data.message);
  };

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setMessage("Logged in successfully");
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setMessage(JSON.stringify(data, null, 2));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setMessage("Logged out");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>MERN Auth Demo</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={getProfile}>Get Profile</button>
      <button onClick={logout}>Logout</button>

      <pre>{message}</pre>
    </div>
  );
}

export default App;
