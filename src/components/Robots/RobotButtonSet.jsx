import React, {useState} from 'react'
import {Button, Grid} from '@material-ui/core'
import {voteForRobotByID} from '../../utils/placeholderRobotList'

const basicButtonStyles = {
    fontFamily:'Helvetica Bold', 
    minHeight: 50, 
    minWidth:100,   
}


const VoteButtonSet = (props)=>{

    const [voteButtonActive, setVoteButtonActive] = useState(false)

    const handleVote = ()=>{
        setVoteButtonActive(true)
        voteForRobotByID(props.robotID)
    }

    return(
        <Button
            disabled={voteButtonActive}
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
                onClick={()=>props.updateAddRobotCards({type:'add', id:props.robotID})}
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
    
    const getButtonSet = ()=>{
        switch(props.pageType){ 
            case 'Admin':
                return AdminButtonSet(props)
            default:
                return VoteButtonSet(props)
        }
    }

    return (
        getButtonSet()
    )
}

export default RobotButtonSet
