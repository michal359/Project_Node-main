import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
import { serverRequests } from '../Api';

function EndOfRegistration({ setUserData }) {

  const UserData = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: UserData.username,
    email: '',
    street: '',
    city: '',
    phone: ''
  });

  const handleAddUser = async () => {

    try {
      setUserData(formData);
      console.log(UserData.id)
      serverRequests('PUT', `users/${UserData.id}`, formData).then((jsonResponse) => {
        setUserData(jsonResponse[0])
        localStorage.setItem('loggedInUser', JSON.stringify(jsonResponse[0]));
        navigate(`/home`)
        alert(`${UserData.username} added successfully!`);
      });

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleInputChangen = (e) => {
    const { name, value } = e.target;
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   username: UserData.username, 
    // }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'username' ? UserData.username : value,
    }));
  };

  return (<>

    <div>
      <h1 className='registerHeader'>End of registration</h1>
      <form>
        <br />
        <div className='endOfRegisterForm'>
          <div className='details'>
            <h2>Personal Info</h2><br />
            <div>
              <input
                type="text"
                name="name"
                placeholder='name'
                value={formData.name}
                onChange={handleInputChangen}
              />
            </div>
            <br />
            <div>
              <input
                type="email"
                name="email"
                placeholder='email'
                value={formData.email}
                onChange={handleInputChangen}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="phone"
                placeholder='phone'
                value={formData.phone}
                onChange={handleInputChangen}
              />
            </div>
            <br />
          </div>

          <div className='address'>
            <h2>Address </h2><br />
            <div>
              <input
                type="text"
                name="street"
                placeholder='street'
                value={formData.street}
                onChange={handleInputChangen}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="city"
                placeholder='city'
                value={formData.city}
                onChange={handleInputChangen}
              />
            </div>
          </div>
        </div>
        <button className='endOfRegisterBtn' type="button" onClick={handleAddUser}>
          Add Yourself
        </button>
      </form>
    </div>
  </>
  )
}

export default EndOfRegistration