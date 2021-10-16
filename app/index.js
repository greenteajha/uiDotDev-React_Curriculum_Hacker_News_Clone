import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./components/navigation";
import Loading from "./components/loading";

const TopNews = React.lazy(() => import('./components/topNews'))
const NewNews = React.lazy(() => import('./components/newNews'))

class App extends React.Component {
    render() {
        return (
            <Router>
                <Navigation />
                <div className="container">
                    <React.Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path="/" component={ TopNews } />
                            <Route exact path="/new" component={ NewNews } />
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