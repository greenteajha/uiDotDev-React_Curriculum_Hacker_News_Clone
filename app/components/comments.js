import React from "react";
import { fetchComments, fetchSingleArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string"
import { newsEntry } from "./newsEntry";
import { commentsEntry } from "./commentsEntry";
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'

// Display post info
function DisplayPostInfo ({postInfo}) {

    return (
        <div className="postInfoContainer" >
            { newsEntry(postInfo) }
        </div>
    )
}

DisplayPostInfo.propTypes = {
    postInfo: PropTypes.object.isRequired
}

// Display list of comments
function DisplayComments ({cL}) {

    return (
        <div className="commentsContainer">
            {cL.map((comment) => {
                return commentsEntry(comment)
            })}
        </div>
    )
}

DisplayComments.propTypes = {
    cL: PropTypes.array.isRequired
}

// React component for comments section
export default class CommentsSection extends React.Component {
    
    state = {
        user: {},        
        commentIDs: [],
        commentList: [],
        error: null
    }

    componentDidMount(){
        this.updateComments()
    }

    updateComments = () => {
        this.setState({
            user: {},
            commentIDs: [],
            commentList: [],
            error: null
        })

        // Extract comment id from URL
        const searchValue = queryString.parse(this.props.location.search)

        if(searchValue.id){

            fetchSingleArticleDetails(searchValue.id)
                .then((data) => {

                    if(data){

                        // Add list of comments id and user information to state
                        this.setState(() => ({
                            user: data,
                            commentIDs: data.kids,
                        }))

                        return data.kids

                    }else{
                        this.setState({
                            error: "There was an error fetching the comments"
                        })
                    }
                })
                // Using comments id to fetch list of comments object
                .then((finalData) => {
                    return fetchComments(finalData)
                })
                // Add comments object to state
                .then((finalArray) => {
                    this.setState(() => ({
                        commentList: finalArray
                    }))
                })
                .catch(() => {
                    this.setState({
                        error: "There was an error fetching the comments"
                    })
                })

        }else{

            this.setState({
                error: "Post id is empty!"
            })

        }

    }

    isLoading = () => {

        if(this.state.error){
            return false
        }else if(!this.state.user || Object.keys(this.state.user).length === 0){
            return true
        }else if(!this.state.commentList || this.state.commentList.length === 0){
            return true
        }else{
            return false
        }
        
    }

    render () {
        return (
            <ThemeConsumer>
                {({theme}) => (
                    <div>
                        { this.state.error && <p className={`error-${theme}`}>{ this.state.error }</p>}
                        { this.isLoading() && <Loading /> }
                        { Object.keys(this.state.user).length !== 0 && this.state.user && <DisplayPostInfo postInfo={this.state.user} /> }
                        { this.state.commentList.length !== 0 && this.state.commentList && <DisplayComments cL={this.state.commentList} /> }
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}