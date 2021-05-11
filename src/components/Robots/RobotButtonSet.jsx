import React from 'react'
import {Button, Grid} from '@material-ui/core'

const basicButtonStyles = {
    fontFamily:'Helvetica Bold', 
    minHeight: 50, 
    minWidth:100,   
}


const VoteButtonSet = (props)=>{
    return(
        <Button
            disableElevation
            style={basicButtonStyles}
            variant="contained" color="primary"
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
            case 'Robots':
                return VoteButtonSet(props) 
            case 'Admin':
                return AdminButtonSet(props)
        }
    }

    return (
        getButtonSet()
    )
}

export default RobotButtonSet
