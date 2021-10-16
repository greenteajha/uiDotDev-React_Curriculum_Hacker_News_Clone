import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./components/navigation";
import TopNews from "./components/topNews";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Navigation />
                <div className="container">
                    <React.Suspense>
                        <Switch>
                            <Route exact path="/" component={ TopNews } />
                        </Switch>
                    </React.Suspense>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)