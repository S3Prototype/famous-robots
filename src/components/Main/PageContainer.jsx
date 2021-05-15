import React from 'react'
import Grid from '@material-ui/core/Grid'

function PageContainer(props) {
    return (
        <Grid direction="column" alignItems="center" 
            style={{backgroundColor: '#F4F6F8',maxWidth:'100vw',}} container
        >
            {props.children}
        </Grid>
    )
}

export default PageContainer
