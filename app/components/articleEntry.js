import React, { Component } from "react";
import { getTopNews } from "../utils/api";

export default class ArticleEntry extends React.Component{
    render () {        

        var arr = getTopNews()
        console.log(arr[1])
        
        return (
            <div></div>
        )

    }
}