import React from 'react'
import {Grid, Button, Card, Typography} from '@material-ui/core'
import RobotCard from './RobotCard'
import RobotButtonSet from './RobotButtonSet'

function RobotGridItem(props) {

    return (
        <RobotCard pseudo={props.pseudo} name={props.name} image={props.image} imgWidth={props.imgWidth}>
            {/* <Button style={{fontFamily:'Helvetica Bold', minHeight: 50, minWidth:100}} variant="contained" size="large" color="primary">Vote</Button> */}
            <RobotButtonSet pageType={props.pageType} />
        </RobotCard>                
        // <Grid lg={4} md={5} item>
        //     <Card
        //         style={{
        //             paddingTop: 30,
        //             paddingBottom: 30, 
        //             maxWidth:400,}}
        //         elevation={2}
        //     >                                
        //         <Grid
        //             direction="column" alignItems="center" 
        //             container
        //         >
        //             <Typography 
        //                 style={{fontFamily:'Helvetica Bold'}}
        //             >
        //                 {props.name}
        //             </Typography>
        //             <img style={{width: props.imgWidth, marginBottom: 30}} src={props.image} />

        //             <Button style={{fontFamily:'Helvetica Bold', minHeight: 50, minWidth:100}} variant="contained" size="large" color="primary">Vote</Button>
        //         </Grid>
        //     </Card>
        // </Grid>
    )
}

export default RobotGridItem
