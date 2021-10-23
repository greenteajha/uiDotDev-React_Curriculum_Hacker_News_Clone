import React from "react";
import { fetchComments, fetchSingleArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string"
import { newsEntry } from "./newsEntry";
import { commentsEntry } from "./commentsEntry";
import { ThemeConsumer } from "../contexts/theme";

// Display post info
function DisplayPostInfo ({postInfo}) {

    //console.log(postInfo)

    return (
        <div>
            { newsEntry(postInfo) }
        </div>
    )
}

// Display list of comments
function DisplayComments ({cL}) {

    //console.log(cL)

    return (
        <div>
            {cL.map((comment) => {
                return commentsEntry(comment)
            })}
        </div>
    )

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

        const searchValue = queryString.parse(this.props.location.search)

        if(searchValue.id){

            fetchSingleArticleDetails(searchValue.id)
                .then((data) => {

                    if(data){

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
                .then((finalData) => {
                    return fetchComments(finalData)
                })
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

        //console.log(this.state.error)

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