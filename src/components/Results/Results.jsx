import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import robotList from '../../utils/placeholderRobotList'
import RobotGridItem from '../Robots/RobotGridItem'
import { UserContext } from '../../contexts/UserContext'


function Results(props) {

    const user = useContext(UserContext)

    console.log("User on results:", user.data)

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
            {
                robotList.map((robot, key)=>(
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
                        robot={robotList[0]} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
        </>                
    )
}

export default Results
