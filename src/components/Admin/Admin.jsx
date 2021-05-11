import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import robotList from '../../utils/placeholderRobotList'
import RobotGridItem from '../Robots/RobotGridItem'
import AddRobotCard from './AddRobotCard'

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

function Admin(props) {

    const classes = useStyles()

    let pseudoElementCount = 0

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'

        //Must add 1 to account for the 'Add new' card
    if(isLargeTablet || isMobileOrSmallTablet)
        pseudoElementCount = (robotList.length + 1) % 2
    else if(robotList.length % 3 > 0){
        pseudoElementCount = 3 - (robotList.length + 1) % 3
    }

    const generatePseudoElements = ()=>{
        const elementArray = []
        for(let i = 0; i < pseudoElementCount; i++){
            elementArray.push(Math.floor(Math.random()*10000))
        }
        return elementArray
    }

    return (             
            <>
            <AddRobotCard imgWidth={imgWidth} />
            {
                robotList.map((robot, key)=>(
                    <RobotGridItem
                        name={robot.name} image={robot.image} 
                        key={key} imgWidth={imgWidth}
                        pageType='Admin'                        
                    />
                ))
            }
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        name={robotList[0].name} image={robotList[0].image} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
            </>                
    )
}

export default Admin
