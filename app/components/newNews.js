import React from "react";
import { fetchNewNews, fetchArticleDetails } from "../utils/api";
import Loading from "./loading";
import { newsEntry } from "./newsEntry";


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


export default class NewNews extends React.Component{
    
    state = {        
        newNewsList: [],
        fetchedList: 0
    }

    componentDidMount(){
        this.updateNewNews()
    }

    updateNewNews = () => {
        this.setState({
            newNewsList: [],
            fetchedList: 0
        })

        fetchNewNews()
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {                        
                        this.setState({
                            newNewsList: res,
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
                <DisplayNewNews newNews={this.state.newNewsList} />
            </div>          
        )

    }
}