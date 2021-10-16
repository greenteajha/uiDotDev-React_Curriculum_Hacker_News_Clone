import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation () {
    return(
        <nav className="row space-between top-nav">
            <ul className="row nav">
                <li>
                    <NavLink 
                        to="/"
                        className="nav-link"
                    >Top
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/new"
                        className="nav-link"
                    >New
                    </NavLink> 
                </li>
            </ul>
            <button
                className="btn"
            >{'Light Theme'}
            </button>
        </nav>
    )
}