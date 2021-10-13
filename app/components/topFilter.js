import React from "react";
import { getTopNews } from '../utils/api'

export default class topFilter extends React.Component {
    render () {

        console.log(getTopNews())

        return (
            <div>Test</div>
        )
    }
}