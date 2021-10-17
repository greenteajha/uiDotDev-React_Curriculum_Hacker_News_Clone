import React from "react";
import { fetchUserNews, fetchUserInfo, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string";
import { newsEntry } from "./newsEntry";


function DisplayUserInfo ({userInfo}) {
    
    console.log(userInfo)

    var date = new Date(userInfo.created)
    
    return (
        <React.Fragment>
            <h1>{ userInfo.id }</h1>
            <div>
                joined { date.toLocaleString() } has { userInfo.karma } karma
            </div>
        </React.Fragment>
    )
}


function DisplayUserNews ({userNews}) {
    return (
        <ul>
            {userNews.map((news) => {
                return newsEntry(news)
            })}
        </ul>
    )
}


export default class UserNews extends React.Component{
    
    state = {
        user: {},        
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
        
        fetchUserInfo(searchValue.userid)
        .then((data) => {
            this.setState (({ user }) => ({
                user: data
            }))
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
                <DisplayUserInfo userInfo={this.state.user} />
                <DisplayUserNews userNews={this.state.userNewsList} />
            </div>       
        )

    }
}