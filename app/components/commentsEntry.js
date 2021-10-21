import React from "react";
import { NavLink } from "react-router-dom";

export function commentsEntry (comments) {

    const { id, by, text, time } = comments

    const specialText = {__html: text}

    var date = new Date(time)

    return(
        <div className="CommentsEntry" key={ id } >
            <div className="commentsInfo" >
                by <NavLink
                    to={`/user?userid=${ by }`}
                    className="nav-link"
                >{ by }
                </NavLink> on { date.toLocaleString() }
            </div>
            <div className="commentsFull" dangerouslySetInnerHTML={ specialText } >
            </div>
        </div>
    )
}