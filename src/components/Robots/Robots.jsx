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
                        robot={robot} 
                        key={key} imgWidth={imgWidth}
                        pageType='Robots'                        
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

export default Robots
