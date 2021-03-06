import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'

// Functional component for comments entry
export function commentsEntry (comments) {

    const { id, by, text, time } = comments

    // Creates an object with __html key to store the comments text.
    const specialText = {__html: text}

    var date = new Date(time)

    // Text loaded is then indicated as dangerouslySetInnerHTML to load HTML tags
    return(
        <ThemeConsumer key={ id }>
            {({ theme }) => (
            <div className={`CommentsEntry-${theme}`} >
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

commentsEntry.propTypes = {
    comments: PropTypes.object.isRequired
}