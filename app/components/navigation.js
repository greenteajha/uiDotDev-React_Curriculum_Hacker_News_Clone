import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation () {
    return(
        <nav className="top-nav">
            <ul className="row nav">
            <li>
                <NavLink 
                    to="/"
                >Top
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/"
                >New
                </NavLink> 
            </li>
        </ul>
        </nav>
    )
}