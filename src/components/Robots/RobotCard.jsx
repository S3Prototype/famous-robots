import React from 'react'
import {Grid, Button, Card, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:397,
        minHeight: 300,
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))

function RobotCard(props) {
    const classes = useStyles()
    return (
        <Grid style={props.pseudo ? {opacity:0,maxWidth:349} : {backgroundColor:'pink',maxWidth:349}} md={5} item>
            <Card elevation={3} style={{display:'flex', width:'100%', justifyContent:'center'}} className={classes.robotCard}>                                
                <Grid style={{minHeight: 445, maxHeight:500, width: 340}}
                    direction="column" alignItems="center" justify="space-between" container
                >
                    <Typography className={classes.robotName}>
                        {props.name}
                    </Typography>
                    <img
                        style={{ maxHeight:300, maxWidth:'90%',}} 
                        src={props.image}
                    />
                    {props.children}
                </Grid>
            </Card>
        </Grid>
    )
}

export default RobotCard
