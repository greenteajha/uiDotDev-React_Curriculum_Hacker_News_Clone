import { array } from "prop-types"

export function getTopNews () {

    const topStoriesEndPoint = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    let articleArray = []

   return fetch(topStoriesEndPoint)
    .then(response => response.json())
    .then(data => {

        for(var key in data.slice(0,10)) {
            var articleID = data[key];

            let response = fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?`)
            articleArray.push(response)
            
        }

        return Promise.all(articleArray)
    })
}