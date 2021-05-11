import React from 'react'
import {Grid, Button, Card, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:400,
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))

function RobotCard(props) {
    const classes = useStyles()
    return (
        <Grid style={props.pseudo ? {opacity:0} : {}} lg={4} md={5} item>
            <Card elevation={3} className={classes.robotCard}>                                
                <Grid direction="column" alignItems="center" container>
                    <Typography className={classes.robotName}>
                        {props.name}
                    </Typography>
                    <img
                        style={{width: props.imgWidth, marginBottom: 30,}} 
                        src={props.image}
                    />
                    {props.children}
                </Grid>
            </Card>
        </Grid>
    )
}

export default RobotCard