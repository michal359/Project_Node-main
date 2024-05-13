import { React, useContext } from 'react'
import {UserContext} from '../App'

function Home() {
   const UserData=useContext(UserContext);
  return (
    <div>

      <h1>Hello ,{UserData.username}</h1>
    </div>
  )
}

export default Home