import React from 'react'
import {Grid, Button, Card, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:400,
        minHeight: 300,
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))

function RobotCard(props) {
    const classes = useStyles()
    return (
        <Grid style={props.pseudo ? {opacity:0} : {}} lg={4} md={5} item>
            <Card elevation={3} style={{display:'flex', justifyContent:'center'}} className={classes.robotCard}>                                
                <Grid style={{minHeight: 445, maxHeight:500, minWidth: 324, maxWidth: 324}} direction="column" alignItems="center" justify="space-between" container>
                    <Typography className={classes.robotName}>
                        {props.name}
                    </Typography>
                    <img
                        style={{maxWidth: '100%',width: props.imgWidth, maxHeight:300,marginBottom: 30,}} 
                        src={props.image}
                    />
                    {props.children}
                </Grid>
            </Card>
        </Grid>
    )
}

export default RobotCard
