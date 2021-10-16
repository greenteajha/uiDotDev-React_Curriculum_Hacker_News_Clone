import React, { Component } from "react";
import { getTopNews } from "../utils/api";

export default class ArticleEntry extends React.Component{
    render () {      

        getTopNews()
            .then((data) => {
                console.log(data)
            })
        
        return (
            <div></div>
        )

    }
}