
/*
Function to obtain the new 10 news from Hacker News API
*/
export function fetchNewNews () {

    const topStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty') 
    const articlePromises = []

    return fetch(topStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.slice(0,20)
        })
}

/*
Function to obtain the top 10 news from Hacker News API
*/
export function fetchTopNews () {

    const topStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty') 
    const articlePromises = []

    return fetch(topStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.slice(0,20)
        })
}

/*
Function to fetch all articles based on article IDs
*/
export function fetchArticleDetails (articleIDs) {

    return Promise.all(
        articleIDs.map(articleID => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`)
                .then(res => res.json())
        )
    )

}