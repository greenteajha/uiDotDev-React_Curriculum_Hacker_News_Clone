import React from "react";
import { fetchTopNews, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import { newsEntry } from "./newsEntry";


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


export default class TopNews extends React.Component{
    
    state = {        
        topNewsList: [],
        fetchedList: 0
    }

    componentDidMount(){
        this.updateTopNews()
    }

    updateTopNews = () => {
        this.setState({
            topNewsList: [],
            fetchedList: 0
        })

        fetchTopNews()
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {                        
                        this.setState({
                            topNewsList: res,
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
                <DisplayTopNews topNews={this.state.topNewsList} />
            </div>       
        )

    }
}