import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data.status === 'success') {
          localStorage.setItem("userName", result.data.userName);
          localStorage.setItem("userCountry", result.data.userCountry);
          navigate('/');
        } else {
          alert(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while logging in. Please try again.");
      });
  };

  return (
    <div className="row justify-content-center align-items-center min-vh-100" style={{ background: "#f8f9fa" }}>
      <div className="col-md-5">
        <div className="card shadow p-4 border-0">
          <div className="text-center">
            <img src="/logo2.png" alt="Logo" style={{ width: '120px' }} />
            <h2 className=" ">Login</h2>
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="btn btn-primary w-100 mb-2" onClick={handleSubmit}>Login</button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;