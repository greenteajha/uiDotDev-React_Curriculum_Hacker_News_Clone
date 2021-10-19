import React from "react";
import { NavLink } from "react-router-dom";

export function newsEntry (newsInfo) {

    if(newsInfo.type === 'story'){

        const { by, descendants, id, kids, time, title, url, type } = newsInfo

        var date = new Date(time)

        return(
            <li className="NewsEntry" key={ id } >
                <a className="title-link" href={ url }>{ title }</a>
                <div className="newsInfo" >
                    by <NavLink
                        to={`/user?userid=${ by }`}
                        className="nav-link"
                    >{ by }
                    </NavLink> on { date.toLocaleString() } with <a href={`/post?id=${ id }`} className="comments-link">{ descendants }</a> comments
                </div>
            </li>
        )
    }
}