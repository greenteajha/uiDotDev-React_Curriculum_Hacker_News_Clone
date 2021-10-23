import React from "react";
import { fetchUserNews, fetchUserInfo, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string";
import { newsEntry } from "./newsEntry";
import { ThemeConsumer } from "../contexts/theme";


function DisplayUserInfo ({userInfo}) {

    var date = new Date(userInfo.created)

    return (
        <ThemeConsumer>
            {({theme}) => (
                <React.Fragment>
                    <h1 className={`userHeader-${theme}`}>{ userInfo.id }</h1>
                    <div className={`userInfo-${theme}`}>
                        joined { date.toLocaleString() } has { userInfo.karma } karma
                    </div>
                </React.Fragment>
            )}
        </ThemeConsumer>
    )
}


function DisplayUserNews ({userNews}) {

    return (
        <ul>
            {userNews.map((news) => {
                    return newsEntry(news)
                })
            }
        </ul>
    )
}


export default class UserNews extends React.Component{
    
    state = {
        user: {},        
        userNewsList: [],
        fetchedList: false,
        fetchedUser: false
    }

    componentDidMount(){
        this.updateUserNews()
    }

    updateUserNews = () => {
        this.setState({
            user: {},
            userNewsList: [],
            fetchedList: false,
            fetchedUser: false,
            error: null
        })

        const searchValue = queryString.parse(this.props.location.search)

        if(searchValue.userid){

            fetchUserNews(searchValue.userid)
                .then((data) => {
                    console.log(data)
                    fetchArticleDetails(data)
                        .then((res) => {
                            this.setState({
                                userNewsList: res,
                                fetchedList: true
                            })
                        })
                })
            
            fetchUserInfo(searchValue.userid)
            .then((data) => {
                this.setState ({
                    user: data,
                    fetchedUser: true
                })
            })
        
        }else{

            this.setState({
                error: "User name is empty!"
            })

        }
        
    }

    isLoading = () => {

        const fetchedUserNews = this.state.userNewsList
        const fetchedUserInfo = this.state.user

        if(this.state.error){
            return false
        }else if((this.state.fetchedUser === false) || (this.state.fetchedList === false)){
            return true
        }else{
            return false
        }
        
    }
    
    render () {
        return (
            <div>
                { this.state.error && <p className='error'>{ this.state.error }</p>}
                { this.isLoading() && <Loading /> }
                { this.state.fetchedUser === true && <DisplayUserInfo userInfo={this.state.user} /> }
                { this.state.fetchedList === true && <DisplayUserNews userNews={this.state.userNewsList} /> }
            </div>       
        )

    }
}