import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import Page from './Page'

function PageHandler(props) {

    const [page, setPage] = useState('admin')

    const userData = {}

    return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {
                            userData.authorized ?
                                <Page pageType='admin'/>
                                :
                                <Page pageType='login'/>                        
                        }
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
