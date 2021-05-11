import React, {useState, useEffect, useReducer, useRef} from 'react'
import {Typography, Box, Container, Grid} from '@material-ui/core'
import Robots from '../Robots/Robots'
import {useMediaQuery} from '@material-ui/core'
import Admin from '../Admin/Admin'

function Main(props) {

    const pageName = useRef('Admin')

    const [pageToShow, setPageToShow] = useReducer((oldSate, page)=>{
        pageName.current = page
        switch(page){
            case 'Robots':
                return <Robots />
            case 'Admin':
                return <Admin />
        }
    }, <Admin />) //Initial page should be Admin when we're done.

    useEffect(() => {
        if(!props.userData.authorized)
            props.setPage('Robots')
    }, []);

    const isSmallMobile = useMediaQuery('(max-device-width: 400px)')

    return (
            <Grid direction="column" alignItems="center" style={{
                    backgroundColor: '#F4F6F8',
                    maxWidth:'100vw',
                }}
            container> 
                <Grid item style={{margin: '3vw', marginBottom:'6vw', minWidth: '90%', maxWidth: '90%',}}
                >
                    <Typography variant="h3" style={{fontFamily: 'Helvetica Bold', maxWidth:'80%'}}
                    >
                        {pageName.current}
                    </Typography>
                </Grid>
                <Grid style={{maxWidth:'90%'}} justify="center"
                    md={11} lg={10} sm={11}  spacing={2} container
                >
                    {pageToShow}
                </Grid>
            </Grid>
    )
}

export default Main
