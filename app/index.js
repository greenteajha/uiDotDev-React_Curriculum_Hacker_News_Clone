import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./components/navigation";
import Loading from "./components/loading";
import { ThemeProvider } from "./contexts/theme";

// Delayed import of components
const TopNews = React.lazy(() => import('./components/topNews'))
const NewNews = React.lazy(() => import('./components/newNews'))
const UserNews = React.lazy(() => import('./components/userNews'))
const commentsSect = React.lazy(() => import('./components/comments'))

class App extends React.Component {

    // Create state to track theme and function to toggle 
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

            // Create React Router
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={`container-${this.state.theme}`}>
                        <Navigation />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path="/" component={ TopNews } />
                                    <Route path="/new" component={ NewNews } />
                                    <Route path="/user" component={ UserNews } />
                                    <Route path="/post" component={ commentsSect } />
                                    <Route render = {() => <h1>404 Page!</h1>} />
                                </Switch>
                            </React.Suspense>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

// Render "App" components
ReactDOM.render(
    <App />,
    document.getElementById('app')
)