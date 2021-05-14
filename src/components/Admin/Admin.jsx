import React, {useState, useReducer, useEffect, useContext} from 'react'
import {useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import RobotGridItem from '../Robots/RobotGridItem'
import AddRobotCard from './AddRobotCard'
import { useUserContext } from '../../contexts/UserContext'
import { useHistory, withRouter } from 'react-router'
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

    const classes = useStyles()

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
    
    const [addCardIDs, setAddCardIDs] = useReducer((oldArray, action)=>{
        switch(action.type){
            case 'remove':
                return oldArray.filter(id=>id!==action.id)
            default:
                return [...oldArray, action.id]
        }
    },[])

    const generatePseudoElements = ()=>{
        const elementArray = []
        for(let i = 0; i < pseudoElementCount+2; i++){
            elementArray.push(Math.floor(Math.random()*10000))
        }
        return elementArray
    }

    const convertToAddCard = (id)=>{
        setAddCardIDs(id)
    }

    const convertFromAddCard = (removeID)=>{
        addCardIDs = addCardIDs.filter(id=>id!==removeID)
    }

    console.log("Admin re-render")

    const getCards = ()=>{        
        return robotList.map((robot)=>{
            if(addCardIDs.includes(robot._id)){
                return (
                    <AddRobotCard
                        id={robot._id} setRobotList={setRobotList}
                        imgWidth={imgWidth} 
                        updateAddRobotCards={setAddCardIDs}
                        robot={robot} 
                        key={robot._id} imgWidth={imgWidth}
                    />
                )
            } 
            return(
                <RobotGridItem
                    id={robot._id} setRobotList={setRobotList}
                    robot={robot} 
                    updateAddRobotCards={setAddCardIDs}
                    key={robot._id} imgWidth={imgWidth}
                    pageType='Admin'                        
                />                    

            )               
        })
    }

    return (             
            <>                        
            <AddRobotCard setRobotList={setRobotList} imgWidth={imgWidth}/>
            {getCards()}
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        convertToAddCard={setAddCardIDs}
                        robot={robotSet.robots[0]} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
            </>                
    )
}

export default withRouter(Admin)
