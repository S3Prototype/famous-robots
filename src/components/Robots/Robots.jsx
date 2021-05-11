import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import voltronImage from '../../images/Robots/voltron.png'
import {makeStyles} from '@material-ui/core/styles'
import robotList from '../../utils/placeholderRobotList'
import RobotGridItem from './RobotGridItem'

const useStyles = makeStyles((theme)=>({
    lastElement: {
        '&::after': {
            content: "'Example sentence to read it'",
            backgroundColor: 'white',
            minWidth: '100vw',
            fontSize: 50,
        },
    }
}))

function Robots() {

    const classes = useStyles()

    let pseudoElementCount = 0

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'

    if(isLargeTablet || isMobileOrSmallTablet)
        pseudoElementCount = robotList.length % 2
    else if(robotList.length % 3 > 0){
        pseudoElementCount = 3 - robotList.length % 3
    }

    const generatePseudoElements = ()=>{
        const elementArray = []
        for(let i = 0; i < pseudoElementCount; i++){
            elementArray.push(i)
        }
        return elementArray
    }

    return (             
            <>
            {
                robotList.map((robot, key)=>(
                    <RobotGridItem
                        name={robot.name} image={robot.image} 
                        key={key} imgWidth={imgWidth}
                        pageType='Robots'                        
                    />
                    // <Grid lg={4} md={5} item>
                    //     <Card
                    //         style={{
                    //             paddingTop: 30,
                    //             paddingBottom: 30, 
                    //             maxWidth:400,}}
                    //         key={key} 
                    //         elevation={2}
                    //     >                                
                    //         <Grid
                    //             direction="column" alignItems="center" 
                    //             container
                    //         >
                    //             <Typography 
                    //                 style={{fontFamily:'Helvetica Bold'}}
                    //             >
                    //                 {robot.name}
                    //             </Typography>
                    //             <img style={{width: imgWidth, marginBottom: 30}} src={robot.image} />
                    //             <Button style={{fontFamily:'Helvetica Bold', minHeight: 50, minWidth:100}} variant="contained" size="large" color="primary">Vote</Button>
                    //         </Grid>
                    //     </Card>
                    // </Grid>
                ))
            }
            {
                generatePseudoElements().map(element=>(
                        <Grid key={Math.floor(Math.random()*10000)} lg={4} md={5} item>
                            <Card
                                style={{
                                    opacity: 0,
                                    paddingTop: 30,
                                    paddingBottom: 30, 
                                    maxWidth:400,}}
                                elevation={2}
                            >                                
                                <Grid 
                                    direction="column" alignItems="center" 
                                    container
                                >
                                    <Typography 
                                        style={{fontFamily:'Helvetica Bold'}}
                                    >
                                        {robotList[0].name}
                                    </Typography>
                                    <img style={{width: imgWidth}} src={robotList[0].image} />
                                    <Button
                                        disabled 
                                        style={{
                                            fontFamily:'Helvetica Bold',
                                            minHeight: 50, minWidth:100
                                        }}
                                        variant="contained" size="large"
                                        color="primary">
                                        Vote
                                    </Button>
                                </Grid>
                            </Card>
                        </Grid>
                ))               
            }
            </>                
    )
}

export default Robots
