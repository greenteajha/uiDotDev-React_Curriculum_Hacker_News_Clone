import React from "react";
import { fetchNewNews, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import { newsEntry } from "./newsEntry";
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'

/* Display all top news article */
function DisplayNewNews ({newNews}) {

    return (
        <ul>
            {newNews.map((news) => {
                return newsEntry(news)
            })}
        </ul>
    )
}

DisplayNewNews.PropTypes = {
    newNews: PropTypes.array.isRequired
}

// React component for "New" news
export default class NewNews extends React.Component{
    
    state = {        
        newNewsList: [],
        error: null
    }

    componentDidMount(){
        this.updateNewNews()
    }

    updateNewNews = () => {
        this.setState({
            newNewsList: []
        })

        fetchNewNews()
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {                        
                        this.setState({
                            newNewsList: res
                        })
                    })
            })
            .catch(() => {

                this.setState({
                    error: "There was an error fetching the New News"
                })
            })
    }

    isLoading = () => {

        if(this.state.newNewsList.length === 0 || !this.state.newNewsList ){
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
                        { this.state.newNewsList.length !== 0 && this.state.newNewsList && <DisplayNewNews newNews={this.state.newNewsList} /> }
                    </div>
                )}    
            </ThemeConsumer>          
        )

    }
}