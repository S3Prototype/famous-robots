import React, {useState} from 'react'
import { Grid, Container } from '@material-ui/core'
import {BrowserRouter as Router} from 'react-router-dom'
import NavBar from './NavBar'
import Main from './Main'

function PageHandler() {

    const [page, setPage] = useState('admin')

    return (
            <Router>
                <NavBar />
                <Main
                    page={page}
                    setPage={setPage} 
                    userData={{authorized:false}}
                />
            </Router>
    )
}

export default PageHandler
