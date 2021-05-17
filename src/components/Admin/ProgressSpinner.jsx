import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'

function ProgressSpinner(props) {
    return (        
        <Grid lg={4} md={5} style={{width:349, maxWidth:349, height:520, maxHeight:520}} item ref={props.gridRef}>
            <Card elevation={2} style={{width:349, maxWidth:349, minHeight:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}> 
                <CircularProgress color="primary" />
            </Card>
        </Grid>
    )
}

export default ProgressSpinner
