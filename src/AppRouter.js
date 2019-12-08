import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './LoginComponent';
import Welcome from './Welcome';
import Books from './Books';
import BookPage from './BookPage'

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Books} />
                <Route path="/" component={LoginComponent} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/book/:id" component={BookPage} />
            </Switch>
        </Router>
    )
}

export default AppRouter;