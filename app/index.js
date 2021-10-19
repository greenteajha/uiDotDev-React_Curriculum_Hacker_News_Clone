import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./components/navigation";
import Loading from "./components/loading";
import { ThemeProvider } from "./contexts/theme";

const TopNews = React.lazy(() => import('./components/topNews'))
const NewNews = React.lazy(() => import('./components/newNews'))
const UserNews = React.lazy(() => import('./components/userNews'))
const commentsSect = React.lazy(() => import('./components/comments'))

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState (({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <Navigation />
                    <div className="container">
                        <React.Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path="/" component={ TopNews } />
                                <Route path="/new" component={ NewNews } />
                                <Route path="/user" component={ UserNews } />
                                <Route path="/post" component={ commentsSect } />
                            </Switch>
                        </React.Suspense>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)