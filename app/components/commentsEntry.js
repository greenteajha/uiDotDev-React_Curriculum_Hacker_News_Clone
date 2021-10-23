import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

export function commentsEntry (comments) {

    const { id, by, text, time } = comments

    const specialText = {__html: text}

    var date = new Date(time)

    return(
        <ThemeConsumer>
            {({ theme }) => (
            <div className={`CommentsEntry-${theme}`} key={ id } >
                <div className={`commentsInfo-${theme}`} >
                    by <NavLink
                        to={`/user?userid=${ by }`}
                        className={`nav-link-${theme}`}
                    >{ by }
                    </NavLink> on { date.toLocaleString() }
                </div>
                <div className={`commentsFull-${theme}`} dangerouslySetInnerHTML={ specialText } >
                </div>
            </div>
            )}
        </ThemeConsumer>
    )
}