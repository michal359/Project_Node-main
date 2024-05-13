import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';

const Register = ({ setUserData }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [password_verify_user, set_password_verify_user] = useState({
    password_verify: "",
  });

  const USERS_API_URL = `users?username=${formData.username}`;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const ContinueDetails = async () => {

    if (formData.username && formData.password && password_verify_user.password_verify) {
      try {
        serverRequests('GET', USERS_API_URL, null).then((usersArr) => {

          if (password_verify_user.password_verify === formData.password) {

            if (usersArr.length !== 0) {
              alert('The username is already exists, choose another username!')
            }
            else {
              const user = {
                username: formData.username, 
                password: formData.password
              }
              serverRequests('POST', 'users', user).then((response) => {
                console.log("res",response[0])
                setUserData(response[0]);
                localStorage.setItem('loggedInUser', JSON.stringify(response[0]));

              })
              alert(`You can continue filling in your details ${user.username}! 😀`);
              navigate('/end-of-registration');
            }
          }
          else {
            alert("The password and password verification are not the same")
          }

        });

      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert('You didnt fill all fields.')
    }
  };

  return (
    <div className="registerDiv">
      <h1>🌈 Join FriendsHub Today!</h1><br></br>
      <form className="registerForm">
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div><br></br>

        <div>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div><br></br>

        <div>
          <input
            placeholder="password verify"
            type="password"
            name="password_verify"
            value={password_verify_user.password_verify}
            onChange={(e) => set_password_verify_user({ password_verify: e.target.value })}
          />
        </div><br></br>

        <button type="button" onClick={ContinueDetails}>
          Continue filling in details
        </button>
      </form>
      <NavLink
        to="/login"
      >
        Do you have an account already? Login here
      </NavLink>

    </div>
  );
};

export default Register