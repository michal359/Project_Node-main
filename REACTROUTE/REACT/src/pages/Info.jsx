import React, {useContext} from 'react'
import { UserContext } from '../App'

function Info() {
  const UserData = useContext(UserContext);
  
  return UserData && (
    <>
    <div className='profile-container'>
      <h1 className='info-header'>{UserData.name} 📋</h1>
      <br/>
      <div className='details'>
        <h2>Personal Info</h2>
        <p>Name: {UserData.name}</p>
        <p>Username: {UserData.username}</p>
        <p>Email: {UserData.email}</p>
        <p>phone: {UserData.phone}</p>
      </div>
      <br/>
      <div className='address'>
        <h2>Address </h2>
        <p>Street: {UserData.street}</p>
        <p>city: {UserData.city}</p>
      </div>
    </div>
  </>
  ) || <h2>user not found</h2>
}

export default Info