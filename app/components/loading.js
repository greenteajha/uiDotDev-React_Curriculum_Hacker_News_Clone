import React from "react";
import PropTypes from 'prop-types'

// Loading React component
export default class Loading extends React.Component {
    
    // Add state to "Loading" text
    state = {
        content: this.props.text
    }

    // If component did mount, execute function to execute "Loading" animation
    componentDidMount () {
        const { speed, text } = this.props

    // Execute interval function
        this.interval = window.setInterval(() => {
            this.state.content === text + "..."
            ? this.setState({ content: text })
            : this.setState(({ content }) => ({ content: content + '.' }))
        }, speed)
    }

    // When component unmounts, remove interval function
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

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

// Default loading text and speed if no props is passed to Loading component
Loading.defaultProps = {
    text: "Loading",
    speed: 300
}