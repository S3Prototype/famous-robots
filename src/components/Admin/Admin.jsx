import React, {useState, useReducer, useEffect, useRef} from 'react'
import {useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import RobotGridItem from '../Robots/RobotGridItem'
import AddRobotCard from './AddRobotCard'
import { useUserContext } from '../../contexts/UserContext'
import { useHistory, withRouter } from 'react-router'
import { useRobotContext } from '../../contexts/RobotContext'
import { resetPopover, showPopover } from '../CustomPopovers/MondoPopover'
import EditRobotCard from './Edit/EditRobotCard'

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

function Admin() {
    const history = useHistory()
    const user = useUserContext()
    const robotSet = useRobotContext()
    
    useEffect(() => {
        if(!user.data.isAdmin){
            user.resetUser()
            history.push('login')
        }
    }, []);


    const [robotList, setRobotList] = useState(robotSet.robots)

    const isMobileOrSmallTablet = useMediaQuery('(max-device-width: 767px)')
    const isLargeTablet = useMediaQuery('(max-device-width: 1023px)')
    
    let imgWidth = 349
    if(isLargeTablet) imgWidth = 290
    if(isMobileOrSmallTablet) imgWidth = '95vw'
    
    let pseudoElementCount = 0
    if(isLargeTablet || isMobileOrSmallTablet)
        //Must add 1 extra to account for the 'Add new' card
        pseudoElementCount = (robotSet.robots.length + 1) % 2
    else if(robotSet.robots.length % 3 > 0){
        pseudoElementCount = 3 - (robotSet.robots.length + 1) % 3
    }
    

        //* Popover alert messages *//
    const popoverText = useRef('')
    const [popoverElement, setPopoverElement] = useState(null)
    const popoverController = {resetPopover, showPopover, popoverText, setPopoverElement, popoverElement}
    
        //* List of robots to render as editable cards *//
    const [editCardIDs, setEditCardIDs] = useReducer((oldArray, action)=>{
        switch(action.type){
            case 'remove':
                return oldArray.filter(id=>id!==action.id)
            default:
                return [...oldArray, action.id]
        }
    },[])

        //* Methods for calculating which elements to render *//
    const getCards = ()=>{        
        return robotList.map((robot)=>{
            if(editCardIDs.includes(robot._id)){
                return (
                    <EditRobotCard
                        id={robot._id} setRobotList={setRobotList}
                        imgWidth={imgWidth} 
                        updateEditCards={setEditCardIDs}
                        robot={robot} 
                        key={robot._id} imgWidth={imgWidth}
                        popoverController={popoverController}
                    />
                )
            } 
            return(
                <RobotGridItem
                    id={robot._id} setRobotList={setRobotList}
                    robot={robot} 
                    convertToEditCard={setEditCardIDs}
                    key={robot._id} imgWidth={imgWidth}
                    pageType='Admin'                        
                />                    

            )               
        })
    }

    const generatePseudoElements = ()=>{
        const elementArray = []
        for(let i = 0; i < pseudoElementCount+2; i++){
            elementArray.push(Math.floor(Math.random()*10000))
        }
        return elementArray
    }

    const renderPseudoElements = ()=>{
        return generatePseudoElements().map(elementNum=>(
            <RobotGridItem
                convertToEditCard={setEditCardIDs}
                robot={robotSet.robots[0]} 
                key={elementNum} imgWidth={imgWidth}
                pageType='Admin' pseudo={true}
            />
        ))  
    }

    return (             
            <>                        
            <AddRobotCard setRobotList={setRobotList} imgWidth={imgWidth} popoverController={popoverController} />
            {getCards()}
            {renderPseudoElements()}
            </>                
    )
}

export default withRouter(Admin)
