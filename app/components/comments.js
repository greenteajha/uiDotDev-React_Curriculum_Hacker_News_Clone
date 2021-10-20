import React from "react";
import { fetchComments, fetchSingleArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string"
import { newsEntry } from "./newsEntry";

function DisplayUserInfo ({userInfo}) {

    return (
        <div>
            { newsEntry(userInfo) }
        </div>
    )
}


function DisplayComments ({postComments}) {
    
    console.log(postComments)
    
    return (

        <ul>
            {postComments.map((comments) => {
                console.log(comments)
                return fetchComments(comments)
            })}
        </ul>
    )
}


export default class CommentsSection extends React.Component {
    
    state = {
        user: {},        
        userNewsList: [],
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
            fetchedUser: false,
            fetchedList: false
        })

        const searchValue = queryString.parse(this.props.location.search)

        fetchSingleArticleDetails(searchValue.id)
            .then((data) => {
                console.log(data.kids)
                this.setState(() => ({
                    user: data,
                    fetchedUser: true,
                    commentIDs: data.kids
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

        console.log(this.state.commentIDs)

        return (
            <div>
                { this.state.fetchedUser === true && <DisplayUserInfo userInfo={this.state.user} /> }
                { this.isLoading() && <Loading /> }
            </div>
        )
    }
}