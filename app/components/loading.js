import React from "react";

export default class Loading extends React.Component {
    state = {
        content: this.props.text
    }

    componentDidMount () {
        const { speed, text } = this.props

        this.interval = window.setInterval(() => {
            this.state.content === text + "..."
            ? this.setState({ content: text })
            : this.setState(({ content }) => ({ content: content + '.' }))
        }, speed)
    }

    componentWillUnmount () {
        window.clearInterval(this.interval)
    }
    
    render () {
        return (
            <p className="loadingText">
                { this.state.content }
            </p>
        )
    }
}

Loading.defaultProps = {
    text: "Loading",
    speed: 300
}