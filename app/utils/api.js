/* Function to obtain the all comments from Hacker News API */
export function fetchComments (commentIDs) {

    return Promise.all(
        commentIDs.map(commentID => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)
                .then(res => res.json())
        )
    )
}

/* Function to obtain the user information from Hacker News API */
export function fetchUserInfo (userName) {

    const userStoriesEndPoint = `https://hacker-news.firebaseio.com/v0/user/${userName}.json?print=pretty`

    return fetch(userStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}


/* Function to obtain the new user stories from Hacker News API */
export function fetchUserNews (userName) {

    const userStoriesEndPoint = `https://hacker-news.firebaseio.com/v0/user/${userName}.json?print=pretty`

    return fetch(userStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.submitted.slice(0,100)
        })
}


/* Function to obtain the new 20 news from Hacker News API */
export function fetchNewNews () {

    const newStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty') 

    return fetch(newStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.slice(0,20)
        })
}


/* Function to obtain the top 20 news from Hacker News API */
export function fetchTopNews () {

    const topStoriesEndPoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty') 

    return fetch(topStoriesEndPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.slice(0,20)
        })
}


/* Function to fetch multiple articles based on article IDs */
export function fetchArticleDetails (articleIDs) {

    return Promise.all(
        articleIDs.map(articleID => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`)
                .then(res => res.json())
        )
    )

}


/* Function to fetch single article based on article ID */
export function fetchSingleArticleDetails (articleID) {

    const articleEndpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`) 

    return fetch(articleEndpoint)
        .then((res) => res.json())
        .then((data) => {
            return data
        })

}