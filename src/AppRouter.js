import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login';
import Welcome from './Welcome';
import Books from './Books';
import BookPage from './BookPage'

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/"  component={Books} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/book/:id" component={BookPage} />
            </Switch>
        </Router>
    )
}

export default AppRouter;