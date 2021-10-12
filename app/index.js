import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Navigation />
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)