import React, {useState} from 'react'
import {Button, Grid} from '@material-ui/core'
import { sendVoteToServer } from '../../utils/robotInteractionMethods'
import { useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'
import ErrorMessage from '../Errors/ErrorMessage'

const basicButtonStyles = {
    fontFamily:'Helvetica Bold', 
    minHeight: 50, 
    minWidth:100,   
    marginTop:'11.5%',
}

const VoteButtonSet = (props, data)=>{
    const handleVote = async ()=>{
        try{
            const voteResult = await sendVoteToServer(props.robot, data.user.data)                    
            const status = voteResult.status
            const resultJSON = await voteResult.json()

            data.robotSet.updateNeeded = true

            if(status === 200){
                data.robotSet.updateRobots(resultJSON.robotSet)
                return props.setAlreadyVotedList(resultJSON.votedForIDs)
            }

            throw new Error(resultJSON.message)
        } catch(err) {
            return data.setErrorMessage(`Error sending vote to server: ${err.message}`)
        }
    }

    return(
        <Button
            disabled={props.alreadyVotedList && props.alreadyVotedList.includes(props.robot._id)}
            disableElevation
            style={basicButtonStyles}
            variant="contained" color="primary"
            onClick={()=>handleVote()}
        >
            Vote
        </Button>
    )
}

const AdminButtonSet = (props, data)=>{
    const deleteRobot = async ()=>{
        try {
            const deleteRequest = await fetch('https://famousrobots-backend.onrender.com/robots/delete', {
                method: 'POST',
                body: JSON.stringify({
                    robot: props.robot
                }),
                headers:{
                    'authorization': `Bearer ${data.user.data.accessToken}`,
                    'content-type': 'application/json'
                }
            })

            const status = deleteRequest.status
            const deleteJSON = await deleteRequest.json()

            if(status === 200){
                data.robotSet.updateRobots(deleteJSON.robotSet)                                    
                return props.setRobotList(deleteJSON.robotSet)
            }

            throw new Error(deleteJSON.message)

        } catch(err) { 
            return data.setErrorMessage(`Error trying to delete robot ${props.robot.name}: ${err.message}`)                  
        }
    }
    

    return (
        <Grid style={{width:'100%', columnGap:20}} container justify="center">        
            <Button
                disableElevation
                style={basicButtonStyles}
                variant="contained" color="primary"
                onClick={()=>props.convertToEditCard({type:'add', id:props.robot._id})}
            >
                EDIT
            </Button> 
            <Button
                disableElevation
                style={basicButtonStyles}
                variant="outlined" color="primary"
                onClick={deleteRobot}
            >
                DELETE
            </Button>
        </Grid>
    )
}

function RobotButtonSet(props) {
    
    const user = useUserContext()
    const robotSet = useRobotContext()
    const [errorMessage, setErrorMessage] = useState('')
    
    const checkIfVotedAlready = robotID=>{
        return user.data.votedForIDs.some(votedID=>votedID==robotID)
    }

    const data = {
        user,
        robotSet,
        setErrorMessage,
    }

    const getButtonSet = (props, data)=>{
        switch(props.pageType){ 
            case 'Admin':
                return AdminButtonSet(props, data)
            default:
                return VoteButtonSet(props, data)
        }
    }

    return (
        <>
            {getButtonSet(props, data)}
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        </>
    )
}

export default RobotButtonSet
