import React, { useReducer } from 'react'
import {Grid, useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import RobotGridItem from './RobotGridItem'
import { useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'
import RobotCardContainer from './RobotCardContainer'

function Robots() {

    const user = useUserContext()
    const robotSet = useRobotContext()

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'
    
    let pseudoElementCount = 0

    if(isLargeTablet || isMobileOrSmallTablet)
        pseudoElementCount = robotSet.robots.length % 2
    else if(robotSet.robots.length % 3 > 0){
        pseudoElementCount = 3 - robotSet.robots.length % 3
    }

    const generatePseudoElements = ()=>{
        if(!robotSet.robots || robotSet.robots.length < 1)
            return []

        const elementArray = []
        for(let i = 0; i < pseudoElementCount+1; i++){
            elementArray.push(i)
        }
        return elementArray
    }

    const [alreadyVotedList, setAlreadyVotedList] = useReducer(
        (_, newArray)=>{
            user.updateVotedForIDs(newArray)    
            return newArray
        }, user.data.votedForIDs)

        const getRobotCards = ()=>{
            return robotSet.robots.map((robot, key)=>(
                <RobotGridItem
                    robot={robot} alreadyVotedList={alreadyVotedList}
                    setAlreadyVotedList={setAlreadyVotedList}
                    key={key} imgWidth={imgWidth}
                    pageType='Robots'                    
                />
            ))
        }
        
        const renderPseudoElements = ()=>{
            return generatePseudoElements().map(elementNum=>(
                <RobotGridItem
                    robot={robotSet.robots[0]}
                    key={elementNum} imgWidth={imgWidth}
                    pageType='Admin' pseudo={true}
                />
            ))
        }

    return (              
        <RobotCardContainer>  
            {getRobotCards()}
            {renderPseudoElements()}
        </RobotCardContainer>                
    )
}

export default Robots
