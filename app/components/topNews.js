import React from "react";
import { fetchTopNews, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import { newsEntry } from "./newsEntry";
import { ThemeConsumer } from "../contexts/theme";


/* Display all top news article */
function DisplayTopNews ({topNews}) {

    return (
        <ul>
            {topNews.map((news) => {
                return newsEntry(news)
            })}
        </ul>
    )
}

// React component for top news
export default class TopNews extends React.Component{
    
    state = {        
        topNewsList: [],
        error: null
    }

    componentDidMount(){
        this.updateTopNews()
    }

    updateTopNews = () => {
        this.setState({
            topNewsList: []
        })

        fetchTopNews()
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {                        
                        this.setState({
                            topNewsList: res,
                        })
                    })
            })
            .catch(() => {
                this.setState({
                    error: "There was an error fetching the Top News"
                })
            })
    }

    isLoading = () => {

        if(this.state.topNewsList.length === 0 || !this.state.topNewsList){
            return true
        }else{
            return false
        }
        
    }
    
    render () {   

        return (

            <ThemeConsumer>
                {(theme) => (
                    <div>
                        { this.state.error && <p className={`error-${theme}`}>{ this.state.error }</p>}
                        { this.isLoading() && <Loading /> }
                        { this.state.topNewsList.length !== 0 && this.state.topNewsList && <DisplayTopNews topNews={this.state.topNewsList} /> }
                    </div>
                )}
            </ThemeConsumer>       
        )

    }
}