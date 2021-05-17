import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'


const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:400,
        display:'flex',
        justifyContent:'center'
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))

function CardContainer(props) {
    const classes = useStyles()
    return (
        <Grid lg={4} md={5} style={{maxWidth:400}} item>
            <Card elevation={3} className={classes.robotCard} >                                
                <Grid direction="column" style={{
                        height: 445, maxHeight:500,
                        width:349, minWidth: 324,
                        maxWidth: 349, rowGap:10
                    }}
                    alignItems="center" container 
                >
                    {props.children}
                </Grid>
            </Card>
        </Grid>
    )
}

export default CardContainer
