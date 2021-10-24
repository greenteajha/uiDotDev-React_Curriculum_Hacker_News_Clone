import React from "react";
import { fetchUserNews, fetchUserInfo, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import queryString from "query-string";
import { newsEntry } from "./newsEntry";
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'


// Takes in the user's info and displays it
function DisplayUserInfo ({userInfo}) {

        var date = new Date(userInfo.created)

        return (
            <ThemeConsumer>
                {({theme}) => (
                    <div className="userInfoContainer">
                        <h1 className={`userHeader-${theme}`}>{ userInfo.id }</h1>
                        <div className={`userInfo-${theme}`}>
                            joined { date.toLocaleString() } has { userInfo.karma } karma
                        </div>
                    </div>
                )}
            </ThemeConsumer>
        )

}

//Props type check for DisplayUserInfo
DisplayUserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired
}

// Takes in the user's list of news
function DisplayUserNews ({userNews}) {

    return (
        <ul className="newsContainer">
            {userNews.map((news) => {
                    return newsEntry(news)
                })
            }
        </ul>
    )
}

DisplayUserNews.propTypes = {
    userNews: PropTypes.array.isRequired
}

// React component for user's news
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
            error: null
        })

        // Extracts user id from URL
        const searchValue = queryString.parse(this.props.location.search)

        if(searchValue.userid){ // Check if user id is empty, if so return an error that user id is empty

            fetchUserNews(searchValue.userid)
                .then((data) => {
                    fetchArticleDetails(data)
                        .then((res) => {
                            this.setState({
                                userNewsList: res,
                            })
                        })
                })
                .catch(() => {

                    this.setState({
                        error: 'There was an error fetching the User Stories.'
                    })

                })
            
            fetchUserInfo(searchValue.userid)
            .then((data) => {

                    this.setState ({
                        user: data,
                    })

            })
            .catch(() => {

                this.setState({
                    error: 'There was an error fetching the User Info'
                })
            })
        
        }else{

            this.setState({
                error: "User name is empty!"
            })

        }
        
    }

    // Checks if the user info and user stories are empty...
    // ...Or checks if there are any error...
    // ...If not, isLoading() function is true
    isLoading = () => {

        console.log(this.state.user)
        console.log(this.state.userNewsList)

        if(this.state.error){
            return false
        }else if((Object.keys(this.state.user).length === 0) || (this.state.userNewsList.length === 0)){
            return true
        }else{
            return false
        }
        
    }
    
    // Render user info and user stories
    render () {

        return (
            <ThemeConsumer>
                {({theme}) => (
                    <div>
                        { this.state.error && <p className={`error-${theme}`}>{ this.state.error }</p>}
                        { this.isLoading() && <Loading /> }
                        { this.state.user !== null && Object.keys(this.state.user).length !== 0 && <DisplayUserInfo userInfo={this.state.user} /> }
                        { this.state.userNewsList.length !== 0 && <DisplayUserNews userNews={this.state.userNewsList} /> }
                    </div>
                )}
            </ThemeConsumer>     
        )

    }
}