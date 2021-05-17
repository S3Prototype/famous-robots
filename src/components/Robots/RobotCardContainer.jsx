import { Grid } from '@material-ui/core'
import React from 'react'

function RobotCardContainer(props) {
    return (               
        <Grid container
        spacing={2} md={12} justify="center"
        alignItems="flex-start"
        >    
            {props.children}
        </Grid>
    )
}

export default RobotCardContainer
