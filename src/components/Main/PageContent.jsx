import React from 'react'
import Grid from '@material-ui/core/Grid'

function PageContent(props) {
    return (
    <Grid style={{maxWidth:'90%'}} justify="center" spacing={2} container>
        {props.children}
    </Grid> 
    )
}

export default PageContent
