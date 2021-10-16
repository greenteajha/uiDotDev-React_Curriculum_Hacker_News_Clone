import React, { Component } from "react";
import { fetchTopNews, fetchArticleDetails } from "../utils/api";


/* 
Display all top news article
*/
function DisplayTopNews ({topNews}) {

    return (
        topNews.map((news) => {
    
            const { by, kids, time, title, url } = news
            var date = new Date(time)

            if(kids === undefined){
                var numberComments = 0
            }else{
                var numberComments = kids.length
            }

            return(
                <div className="topNewsEntry" key={url}>
                    <a href={ url }>{ title }</a>
                    <div>by { by } on { date.toLocaleString() } with { numberComments } comments</div>
                </div>
            )
    
    
        })
    )

    
}

export default class TopNews extends React.Component{
    
    state = {        
        topNewsList: []
    }

    componentDidMount(){
        this.updateTopNews()
    }

    updateTopNews = () => {
        this.setState({
            topArticleList: []
        })

        fetchTopNews()
            .then((data) => {
                fetchArticleDetails(data)
                    .then((res) => {                        
                        this.setState({
                            topNewsList: res
                        })
                    })
            })
    }
    
    render () {   

        return (
            <div>
                { <DisplayTopNews topNews={this.state.topNewsList} /> }
            </div>
        )

    }
}