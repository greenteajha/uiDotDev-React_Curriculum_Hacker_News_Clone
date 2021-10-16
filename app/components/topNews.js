import React from "react";
import { fetchTopNews, fetchArticleDetails } from "../utils/api";


/* Display all top news article */
function DisplayTopNews ({topNews}) {

    return (
        <ul>
            {topNews.map((news) => {
        
                const { by, kids, time, title, url } = news
                var date = new Date(time)

                if(kids === undefined){
                    var numberComments = 0
                }else{
                    var numberComments = kids.length
                }

                return(
                    <li className="topNewsEntry" key={ url } >
                        <a className="title-link" href={ url }>{ title }</a>
                        <div className="newsInfo" >
                            by <a href="#" >{ by }</a> on { date.toLocaleString() } with <a href="#" >{ numberComments }</a> comments
                        </div>
                    </li>
                )
        
        
            })}
        </ul>
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
            topNewsList: []
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
                <DisplayTopNews topNews={this.state.topNewsList} />
            </div>       
        )

    }
}