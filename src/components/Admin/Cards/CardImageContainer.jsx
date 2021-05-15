import React from 'react'
import Grid from '@material-ui/core/Grid'

function CardImageContainer(props) {
    return (
        <Grid container style={{
            height:280, maxHeight:280, rowGap:20,   
            maxWidth: '100%', position:'relative', 
        }}
            direction="column" justify="center" alignItems="center"
        >
            {props.children}
        </Grid>
    )
}

export default CardImageContainer
