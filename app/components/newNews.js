import React from "react";
import { fetchNewNews, fetchArticleDetails } from "../utils/api";


/* Display all top news article */
function DisplayNewNews ({newNews}) {

    return (
        newNews.map((news) => {
    
            const { by, kids, time, title, url } = news
            var date = new Date(time)

            if(kids === undefined){
                var numberComments = 0
            }else{
                var numberComments = kids.length
            }

            return(
                <div className="newNewsEntry" key={url}>
                    <div>
                        <a className="title-link" href={ url }>{ title }</a>
                    </div>
                    <div className="newsInfo">
                        by <a href="#" >{ by }</a> on { date.toLocaleString() } with <a href="#" >{ numberComments }</a> comments
                    </div>
                </div>
            )
    
    
        })
    )
}


export default class NewNews extends React.Component{
    
    state = {        
        newNewsList: []
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
    }
    
    render () {   

        return (
            <div>
                { <DisplayNewNews newNews={this.state.newNewsList} /> }
            </div>
        )

    }
}