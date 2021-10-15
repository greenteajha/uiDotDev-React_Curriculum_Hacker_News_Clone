import { array } from "prop-types"

/*
Function to obtain the top 10 news from Hacker News API
*/
export function getTopNews () {

    const topStoriesEndPoint = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    let articleArray = []

   return fetch(topStoriesEndPoint)
    .then(response => response.json())
    .then(data => {

        console.log(data)
        console.log(typeof(data))

        for(var key in data.slice(0,10)) {
            var articleID = data[key];
            console.log(articleID)

            let response = fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?`)
            .then(response => response.json())
            .then(data => {
                articleArray.push(data)
            })
            
            
        }

        //console.log(Promise.all(articleArray))

        //console.log(articleArray)
        return articleArray

    })
}