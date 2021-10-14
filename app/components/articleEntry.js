import React, { Component } from "react";
import { getTopNews } from "../utils/api";

export default class ArticleEntry extends React.Component{
    render () {

            getTopNews()
            .then(res => {
                for(var a in res){
                    res[a].json()
                    .then(resp => {
                        console.log(resp.url)
                    })
                }
            })

        return (
            <div></div>
        )
    }
}