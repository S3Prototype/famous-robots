import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { UserContext, useUserContext } from '../../contexts/UserContext'
import Page from './Page'

function PageHandler() {
    return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Page pageType='login' />
                    </Route>
                    <Route exact path='/results'>
                        <Page pageType='results' />
                    </Route>
                    <Route exact path='/robots'>
                        <Page pageType='robots' />
                    </Route>
                    <Route exact path='/admin'>
                        <Page pageType='admin' />
                    </Route>
                    <Route exact path='/login'>
                        <Page pageType='login' />
                    </Route>
                </Switch>
            </Router>
    )
}

export default PageHandler
