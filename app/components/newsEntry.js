import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

export function newsEntry (newsInfo) {

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
                        </NavLink> on { date.toLocaleString() } with <Link
                            className={`comments-link-${theme}`}
                            to={{
                                pathname: `/post`,
                                search: `?id=${ id }`
                            }}
                        >
                            { descendants }
                        </Link> comments
                    </div>
                </li>
            )}
        </ThemeConsumer>
    )
}