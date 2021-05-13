import React from 'react'
import {Typography, Grid} from '@material-ui/core'
import Robots from '../Robots/Robots'
import Admin from '../Admin/Admin'
import Results from '../Results/Results'
import Login from '../Login/Login'
import NavBar from '../Main/NavBar'

function Page(props) {

    const getPage = ()=>{
        switch(props.pageType){
            case 'robots':
                return <Robots />
            case 'admin':
                return <Admin />
            case 'results':
                return <Results />
            case 'login':
                return <Login />
        }
    }

    const pageName = props.pageType.replace(/^\w/, (c) => c.toUpperCase());

    return (
        <>
        {
            props.pageType !== 'login' &&
                <NavBar />
        }
        <Grid direction="column" alignItems="center" style={{
                backgroundColor: '#F4F6F8',
                maxWidth:'100vw',
            }}
        container>
            {
                props.pageType !== 'login' &&
                <Grid item style={{margin: '3vw', marginBottom:'6vw', minWidth: '90%', maxWidth: '90%',}}
                >
                    <Typography variant="h3" style={{fontFamily: 'Helvetica Bold', maxWidth:'80%'}}
                    >
                        {pageName}
                    </Typography>
                </Grid>
            }
            <Grid style={{maxWidth:'90%'}} justify="center"
                  spacing={2} container
            >                
                {getPage()}
            </Grid>
        </Grid>
        </>
    )
}

export default Page
