import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

export default function Navigation () {
    return(
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className="row space-between top-nav">
                    <ul className="row nav">
                        <li>
                            <NavLink 
                                to="/"
                                className="bar-nav-link"
                            >Top
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/new"
                                className="bar-nav-link"
                            >New
                            </NavLink> 
                        </li>
                    </ul>
                    <button 
                    className="btn"
                    onClick={ toggleTheme }
                    >
                        { theme === 'light' ? '🔦' : '💡' }
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}