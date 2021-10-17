import React from "react";
import { NavLink } from "react-router-dom";

export function newsEntry (newsInfo) {

    if(newsInfo.type === 'story'){

        const { by, id, kids, time, title, url, type } = newsInfo

        var date = new Date(time)

        if(kids === undefined){
            var numberComments = 0
        }else{
            var numberComments = kids.length
        }

        return(
            <li className="NewsEntry" key={ id } >
                <a className="title-link" href={ url }>{ title }</a>
                <div className="newsInfo" >
                    by <NavLink
                        to={`/user?userid=${ by }`}
                        className="nav-link"
                    >{ by }
                    </NavLink> on { date.toLocaleString() } with <a href="#" className="comments-link">{ numberComments }</a> comments
                </div>
            </li>
        )
    }
}