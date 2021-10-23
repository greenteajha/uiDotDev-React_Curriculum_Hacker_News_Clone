import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

// Functional component for the top navigation bar
export default function Navigation () {
    return(

        // Include context values for dark, light theme and toggle theme function
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className={`row space-between top-nav-${ theme }`} >
                    <ul className="row nav">
                        <li>
                            <NavLink 
                                to="/"
                                className={`bar-nav-link-${theme}`}
                            >Top
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/new"
                                className={`bar-nav-link-${theme}`}
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