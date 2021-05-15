import Grid from '@material-ui/core/Grid'
import React from 'react'

function LoginUIContainer(props) {
    return (
        <Grid
                className={props.className} direction="column"
                justify="space-evenly" alignItems="center"
                container
            >
                {props.children}
        </Grid>
    )
}

export default LoginUIContainer
