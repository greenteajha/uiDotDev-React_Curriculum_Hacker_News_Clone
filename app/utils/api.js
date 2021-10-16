import { array } from "prop-types"

/*
Function to obtain the top 10 news from Hacker News API
*/
export function getTopNews () {

    const topStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')

    return fetch(topStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {

           return data
        })
    
}