import { array } from "prop-types"

/*
Function to obtain the top 10 news from Hacker News API
*/
export function getTopNews () {

    const topStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty') 
    const articlePromises = []

    return fetch(topStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            
            for (const articleID in data.slice(0,10)){
                fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                    })
            }
        })
    
}