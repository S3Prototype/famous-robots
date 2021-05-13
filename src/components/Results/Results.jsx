import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import RobotGridItem from '../Robots/RobotGridItem'
import { UserContext, useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'


function Results(props) {

    const user = useUserContext()
    const robotSet = useRobotContext()

    let pseudoElementCount = 0

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'

        //Must add 1 to account for the 'Add new' card
    if(isLargeTablet || isMobileOrSmallTablet)
        pseudoElementCount = (robotSet.robots.length + 1) % 2
    else if(robotSet.robots.length % 3 > 0){
        pseudoElementCount = 3 - (robotSet.robots.length + 1) % 3
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
            {
                robotSet.robots.map((robot, key)=>(
                    <RobotGridItem
                        robot={robot} 
                        key={key} imgWidth={imgWidth}
                        pageType='Results'                        
                    />
                ))
            }
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        robot={robotSet.robots} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
        </>                
    )
}

export default Results
