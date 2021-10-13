const api_url = 'https://hacker-news.firebaseio.com/v0/'

export function getTopNews () {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((response) => response.json())
}