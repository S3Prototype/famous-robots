import React, { useReducer } from 'react'
import {useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import RobotGridItem from './RobotGridItem'
import { useUserContext } from '../../contexts/UserContext'
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
        if(!robotSet.robots || robotSet.robots.length < 1)
            return []

        const elementArray = []
        for(let i = 0; i < pseudoElementCount+1; i++){
            elementArray.push(i)
        }
        return elementArray
    }

    const [alreadyVotedList, setAlreadyVotedList] = useReducer(
        (oldList, newArray)=>{
            user.updateVotedForIDs(newArray)    
            return newArray
        }, user.data.votedForIDs)

    return (             
            <>
            {
                robotSet.robots.map((robot, key)=>(
                    <RobotGridItem
                        robot={robot} alreadyVotedList={alreadyVotedList}
                        setAlreadyVotedList={setAlreadyVotedList}
                        key={key} imgWidth={imgWidth}
                        pageType='Robots'                    
                    />
                ))
            }
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        robot={robotSet.robots[0]} user={user} robotSet={robotSet}
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))
            }
            </>                
    )
}

export default Robots
