import React from "react";
import { fetchUserNews, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string";
import { newsEntry } from "./newsEntry";


function DisplayUserNews ({userNews}) {
    return (
        <React.Fragment>
            <h1>TEST</h1>
            <ul>
                {userNews.map((news) => {
                    return newsEntry(news)
                })}
            </ul>
        </React.Fragment>
    )
}


export default class UserNews extends React.Component{
    
    state = {
        user: '',        
        userNewsList: [],
        fetchedList: 0
    }

    componentDidMount(){
        this.updateUserNews()
    }

    updateUserNews = () => {
        this.setState({
            userNewsList: [],
            fetchedList: 0
        })

        const searchValue = queryString.parse(this.props.location.search)

        fetchUserNews(searchValue.userid)
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {     
                        this.setState({
                            userNewsList: res,
                            fetchedList: 1
                        })
                    })
            })
    }

    isLoading = () => {
        const fetched = this.state.fetchedList

        if(fetched === 0){
            return true
        }else{
            return false
        }
        
    }
    
    render () {
        return (
            <div>
                { this.isLoading() && <Loading /> }
                <DisplayUserNews userNews={this.state.userNewsList} />
            </div>       
        )

    }
}