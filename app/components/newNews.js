import React from "react";
import { fetchNewNews, fetchArticleDetails } from "../utils/api";


/* Display all top news article */
function DisplayNewNews ({newNews}) {

    return (
        <ul>
            {newNews.map((news) => {
        
                const { by, kids, time, title, url } = news
                var date = new Date(time)

                if(kids === undefined){
                    var numberComments = 0
                }else{
                    var numberComments = kids.length
                }

                return(
                    <li className="newNewsEntry" key={ title } >
                        <a className="title-link" href={ url }>{ title }</a>
                        <div className="newsInfo">
                            by <a href="#" >{ by }</a> on { date.toLocaleString() } with <a href="#" >{ numberComments }</a> comments
                        </div>
                    </li>
                )
        
        
            })}
        </ul>
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
                <DisplayNewNews newNews={this.state.newNewsList} />
            </div>          
        )

    }
}