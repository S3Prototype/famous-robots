import {Grid, Paper, Box, Button, Card, Typography} from '@material-ui/core'
import React, {useState, useReducer, useEffect, useContext} from 'react'
import {useMediaQuery} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import robotList from '../../utils/placeholderRobotList'
import RobotGridItem from '../Robots/RobotGridItem'
import AddRobotCard from './AddRobotCard'
import { UserContext } from '../../contexts/UserContext'
import { withRouter } from 'react-router'
import { autoLogin } from '../../utils/loginMethods'

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

    
    const user = useContext(UserContext)
    console.log("User on admin:", user.data)

    useEffect(async () => {
        console.log("User is", user)
        if(!user.data.isAdmin || !user.data.loggedIn){
            console.log("Trying to log the user out. user is:", user)
            user.resetUser()
            props.history.push('/')
        }

        // if(await autoLogin(user) === "success")
        //     if(!user.data.isAdmin)
        //         return props.history.push('/')
    }, []);

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
        for(let i = 0; i < pseudoElementCount; i++){
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

    const getCards = ()=>{        
        return robotList.map((robot)=>{
            if(addCardIDs.some(id=>id===robot.id)){
                return (
                    <AddRobotCard
                        imgWidth={imgWidth} 
                        updateAddRobotCards={setAddCardIDs}
                        robot={robot} 
                        key={robot.id} imgWidth={imgWidth}
                    />
                )
            } 
            return(
                <RobotGridItem
                    id={robot.id}
                    robot={robot} 
                    updateAddRobotCards={setAddCardIDs}
                    key={robot.id} imgWidth={imgWidth}
                    pageType='Admin'                        
                />                    

            )               
        })
    }

    return (             
            <>                        
            <AddRobotCard imgWidth={imgWidth}/>
            {getCards()}
            {
                generatePseudoElements().map(elementNum=>(
                    <RobotGridItem
                        convertToAddCard={setAddCardIDs}
                        robot={robotList[0]} 
                        key={elementNum} imgWidth={imgWidth}
                        pageType='Admin' pseudo={true}
                    />
                ))               
            }
            </>                
    )
}

export default withRouter(Admin)
