import { React, createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Enter from "./pages/Enter"
import HomeLayout from './components/HomeLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import EndOfRegistration from './pages/EndOfRegistration'
import Register from './pages/Register'
import Albums from './pages/Albums'
import AlbumDetails from './pages/AlbumDetails';
import Posts from './pages/Posts'
import Info from './pages/Info'
import Todos from './pages/Todos'
import './App.css'
export const UserContext = createContext();
export const AlbumsContext = createContext();

function App() {
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    setUserData(dataFromLocalStorage)
  }, []);


  const [UserData, setUserData] = useState({});

  const [AlbumsData, setAlbumsData] = useState([]);

  return (

    <UserContext.Provider value={UserData}>
      <AlbumsContext.Provider value={AlbumsData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Enter />} />
              <Route path="login" element={<Login setUserData={setUserData} />} />
              <Route path="register" element={<Register setUserData={setUserData} />} />
              <Route path="end-of-registration" element={<EndOfRegistration setUserData={setUserData} />} />
            </Route>

            <Route path="/home" element={<HomeLayout />} >
              <Route index element={<Home />} />
              <Route path="/home/users/:id/info" element={<Info />} />
              <Route path="/home/users/:id/todos" element={<Todos />} />
              <Route path="/home/users/:id/posts" element={<Posts />} />
              <Route path="/home/users/:id/albums" element={<Albums setAlbumsData={setAlbumsData} />} />
              <Route path="/home/users/:id/albums/:albumId/photos" element={<AlbumDetails />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AlbumsContext.Provider>
    </UserContext.Provider>
  )
}

export default App








