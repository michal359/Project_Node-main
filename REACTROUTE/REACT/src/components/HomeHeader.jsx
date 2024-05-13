import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from '../App'

export default function HomeHeader({ setUserData }) {

    const UserData = useContext(UserContext);
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <header>
            <Link className="site-logo" to="/home">#FriendsHub</Link>
            <h4 className="Hii-user">{UserData.username}</h4>
            <nav className="loginAndRegisterNavBar">
                <NavLink
                    to={`/home/users/${UserData.id}/info`}
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Info
                </NavLink>
                <NavLink
                    to={`/home/users/${UserData.id}/todos`}
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Todos
                </NavLink>
                <NavLink
                    to={`/home/users/${UserData.id}/posts`}
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Posts
                </NavLink>

                <NavLink
                    to={`/home/users/${UserData.id}/albums`}
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Albums
                </NavLink>
                <NavLink
                    to={`/`}
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={() => localStorage.removeItem('loggedInUser')}
                >
                    Logout
                </NavLink>

            </nav>
        </header>
    )
}