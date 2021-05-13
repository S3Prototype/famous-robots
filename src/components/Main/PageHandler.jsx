import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Page from './Page'

function PageHandler() {
    const userData = useContext(UserContext)
    console.log("Page handler data", userData.data)
    return (
            <Router>
                <Switch>
                {
                    //You can only see the pages if you're logged in.
                    userData.data.loggedIn &&
                    <>
                        <Route exact path='/'>
                            {
                                userData.data.loggedIn ?
                                    userData.data.isAdmin ?
                                        <Page pageType='admin'/>
                                        :
                                        <Page pageType='robots'/>
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
                    </>
                }
                {
                    !userData.data.loggedIn &&
                        <Route path='/'>
                                <Page pageType='login' />
                        </Route>
                }
                </Switch>
            </Router>
    )
}

export default PageHandler
