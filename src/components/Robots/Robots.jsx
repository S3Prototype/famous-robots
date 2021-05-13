import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import voltronImage from '../../images/Robots/voltron.png'
import {makeStyles} from '@material-ui/core/styles'
import RobotGridItem from './RobotGridItem'
import { useUserContext } from '../../contexts/UserContext'
import RobotButtonSet from './RobotButtonSet'
import { useRobotContext } from '../../contexts/RobotContext'

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

    const user = useUserContext()
    const robotSet = useRobotContext()

    console.log("User on robots:", user.data)

    const classes = useStyles()

    let pseudoElementCount = 0

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'

    if(isLargeTablet || isMobileOrSmallTablet)
        pseudoElementCount = robotSet.robots.length % 2
    else if(robotSet.robots.length % 3 > 0){
        pseudoElementCount = 3 - robotSet.robots.length % 3
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
                robotSet.robots.map((robot, key)=>(
                    <RobotGridItem
                        robot={robot} 
                        key={key} imgWidth={imgWidth}
                        pageType='Robots'                        
                    />
                ))
            }
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        robot={robotSet.robots[0]} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
            </>                
    )
}

export default Robots
