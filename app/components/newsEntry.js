import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'

export function newsEntry (newsInfo) {
    
    if(newsInfo){

        const { by, descendants, deleted, id, time, title, url, type } = newsInfo

        // If news is "story" type and the news is NOT deleted
        if(type === "story" && !deleted){

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
    }
}

newsEntry.PropTypes = {
    newsInfo: PropTypes.object.isRequired
}