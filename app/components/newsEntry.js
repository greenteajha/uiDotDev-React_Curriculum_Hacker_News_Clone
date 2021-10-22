import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

export function newsEntry (newsInfo) {

    console.log(newsInfo)

    const { by, descendants, id, kids, time, title, url } = newsInfo

    var date = new Date(time)

    return(
        <ThemeConsumer>
            {({ theme }) => (
                <li className="NewsEntry" key={ id } >
                    <a className="title-link" href={ url }>{ title }</a>
                    <div className="newsInfo" >
                        by <NavLink
                            to={`/user?userid=${ by }`}
                            className={`nav-link-${theme}`}
                        >{ by }
                        </NavLink> on { date.toLocaleString() } with <a href={`/post?id=${ id }`} className={`comments-link-${theme}`}>{ descendants }</a> comments
                    </div>
                </li>
            )}
        </ThemeConsumer>
    )
}