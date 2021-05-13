import React, {useContext, useState} from 'react'
import {Button, Grid} from '@material-ui/core'
import {voteForRobotByID} from '../../utils/placeholderRobotList'
import { sendVoteToServer } from '../../utils/robotInteractionMethods'
import { UserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'

const basicButtonStyles = {
    fontFamily:'Helvetica Bold', 
    minHeight: 50, 
    minWidth:100,   
}


const VoteButtonSet = (props)=>{

    const userVotedStatus = props.user.data.votedForAlready.some(robotID=>robotID===props.robot._id) 
    const [alreadyVoted, setAlreadyVoted] = useState(userVotedStatus)

    const handleVote = ()=>{
        try{
            const voteResult = await sendVoteToServer(props.robot, props.user.data)                    
            const status = voteResult.status
            const resultJSON = await voteResult.json()

            robotSet.updateNeeded = true
            
            if(status === 200){
                    //props.robotSet & props.user are the
                    //real user and robotSet contexts
                props.robotSet.updateRobots(resultJSON.robots)
                props.user.updateVotedForAlready(resultJSON.votedForAlready)
                return setAlreadyVoted(true)
            }

            throw new Error(resultJSON.message)
        } catch(err) {
            console.log('Error sending vote to server:', err)
            //return error popup modal
        }
    }

    return(
        <Button
            disabled={alreadyVoted}
            disableElevation
            style={basicButtonStyles}
            variant="contained" color="primary"
            onClick={()=>handleVote()}
        >
            Vote
        </Button>
    )
}

const AdminButtonSet = (props)=>{
    return (
        <Grid style={{width:'100%', columnGap:20}} container justify="center">        
            <Button
                disableElevation
                style={basicButtonStyles}
                variant="contained" color="primary"
                onClick={()=>props.updateAddRobotCards({type:'add', id:props.robot.id})}
            >
                EDIT
            </Button> 
            <Button
                disableElevation
                style={basicButtonStyles}
                variant="outlined" color="primary"
            >
                DELETE
            </Button>
        </Grid>
    )
}

function RobotButtonSet(props) {
    
    const user = useContext(UserContext)
    const robotSet = useRobotContext()

    props.user = user
    props.robotSet = robotSet

    const getButtonSet = (props)=>{
        switch(props.pageType){ 
            case 'Admin':
                return AdminButtonSet(props)
            default:
                return VoteButtonSet(props)
        }
    }

    return (
        getButtonSet(props)
    )
}

export default RobotButtonSet
