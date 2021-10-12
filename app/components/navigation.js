import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation () {
    return(
        <nav className="row space-between">
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
                        to="/"
                        className="nav-link"
                    >New
                    </NavLink> 
                </li>
            </ul>
        </nav>
    )
}