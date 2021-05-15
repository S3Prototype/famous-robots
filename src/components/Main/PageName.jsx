import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function PageName(props) {

    const user = useUserContext()

        //Don't show page name on login
    if(!user.data.loggedIn || props.pageType === 'login')
        return null

    return (
        <Grid item 
            style={{margin: '3vw', marginBottom:'6vw', minWidth: '90%', maxWidth: '90%',}}
        >
            <Typography
                variant="h3"
                style={{fontFamily: 'Helvetica Bold', maxWidth:'80%'}}
            >
                {props.name}
            </Typography>
        </Grid>
    )
}

export default PageName
