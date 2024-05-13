import React from "react"
import { NavLink } from "react-router-dom"

export default function Enter() {

    return (
        <>
            <div className='loginAndRegisterBtn'>
                <NavLink
                    to="/register"
                >
                    Register
                </NavLink>
                <NavLink
                    to="/login"
                >
                    Login
                </NavLink>
            </div>
            <div className="enterPage">
                <h1>Welcome to FriendsHub 🥰</h1>
                <p>where seamless social interactions
                    meet efficient task management! Our home page is a
                    gateway to a world of features designed to enhance
                    your digital social experience. Here's a sneak peek
                    into what FriendsHub has to offer:</p>
                <h2>🌟 Personalized Dashboard</h2>
                <p>Upon logging in, your personalized dashboard awaits!
                    Stay updated with real-time feeds from friends,
                    recent activities, and tailored recommendations
                    based on your preferences. Seamlessly connect with friends,
                    manage tasks, share captivating posts, and preserve cherished
                    memories through albums, all in one vibrant social platform.</p>
                <h2>🌈 Join FriendsHub Today!</h2>
                <p>Subscribe to FriendsHub now and unlock a world where social connections
                    and task management seamlessly come together. Experience the joy of
                    staying connected, organized, and engaged in a community that celebrates
                    every moment.</p>
            </div></>
    )
};