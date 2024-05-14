import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';

const Login = ({ setUserData }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleLogin() {
    
    const USERS_API_URL = `users?username=${formData.username}&password=${formData.password}`;

    const fetchUsers = async () => {
      try {
        // serverRequests('GET', USERS_API_URL, null).then((usersArr) => {
        //   console.log(usersArr);
        //   if (usersArr.length > 0) {
        //     const user = usersArr[0];
        //     console.log('User data:', user); 
        //     setUserData(user);
        //     alert(`Login successful! Welcome back ${user.username}😎`);
        //     const { password ,...userInLocalStorage } = user;
        //     localStorage.setItem('loggedInUser', JSON.stringify(userInLocalStorage));
        //     console.log('Stored user data:', userInLocalStorage); 
        //     navigate(`/home`);
        //   } else {
        //     alert("Login failed. Invalid username or password.");
        //   }
        serverRequests('POST', 'login', formData)
        .then((user) => {
          if (user) {
            console.log('User data:', user[0]); 
            setUserData(user[0]);
            alert(`Login successful! Welcome back ${user[0].username}😎`);
            localStorage.setItem('loggedInUser', JSON.stringify(user[0]));
            console.log('Stored user data:', user[0]); 
            navigate(`/home`);
          } else {
            alert("Login failed. Invalid username or password.");
          }
          
        })
      } catch (err) {
        alert("Login failed. An error occurred.");
        console.log(err);
      }
    }; 
    fetchUsers();
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (

    <div className='loginDiv'>

      <h1>Login</h1><br></br>
      <form className='loginForm'>
        <div>
          <input
            placeholder='username'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div><br></br>
        <div>
          <input
            placeholder='password'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div><br></br>
        <button type="button" onClick={() => handleLogin()}>
          Login
        </button>

      </form>
      <NavLink
        to="/register"
      >
        Dont have an account? Register here
      </NavLink>
    </div>

  );
};

export default Login;
