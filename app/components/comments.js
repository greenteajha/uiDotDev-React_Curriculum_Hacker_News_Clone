import React from "react";
import { fetchComments, fetchSingleArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string"
import { newsEntry } from "./newsEntry";
import { commentsEntry } from "./commentsEntry";

function DisplayUserInfo ({userInfo}) {

    return (
        <div>
            { newsEntry(userInfo) }
        </div>
    )
}

function DisplayComments ({cL}) {

    return (
        <div>
            {cL.map((comment) => {
                return commentsEntry(comment)
            })}
        </div>
    )

}

export default class CommentsSection extends React.Component {
    
    state = {
        user: {},        
        commentIDs: [],
        commentList: {},
        fetchedList: false,
        fetchedUser: false
    }

    componentDidMount(){
        this.updateComments()
    }

    updateComments = () => {
        this.setState({
            user: {},
            commentIDs: [],
            commentList: {},
            fetchedList: false,
            fetchedUser: false
        })

        const searchValue = queryString.parse(this.props.location.search)

        fetchSingleArticleDetails(searchValue.id)
            .then((data) => {

                this.setState(() => ({
                    user: data,
                    commentIDs: data.kids,
                    fetchedUser: true
                }))

                return this.state.commentIDs

            })
            .then((finalData) => {
                return fetchComments(finalData)
            })
            .then((finalArray) => {
                this.setState(() => ({
                    commentList: finalArray,
                    fetchedList: true
                }))
            })

        

    }

    isLoading = () => {

        if((this.state.fetchedUser === false) || (this.state.fetchedList === false)){
            return true
        }else{
            return false
        }
        
    }

    render () {

        return (
            <div>
                { this.state.fetchedUser === true && <DisplayUserInfo userInfo={this.state.user} /> }
                { this.state.fetchedList === true && <DisplayComments cL={this.state.commentList} /> }
                { this.isLoading() && <Loading /> }
            </div>
        )
    }
}