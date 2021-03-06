import { Typography } from '@material-ui/core'
import React from 'react'
import { maxRobotVotes } from '../../contexts/RobotContext'

function ProgressBar(props) {
    return (
        <div style={{
                display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
                rowGap: 9, minHeight:90, maxHeight:90, minWidth:'90%', maxWidth:'90%',
            }}>            
            <div style={{display:'flex', alignItems:'flex-end'}}>
                <Typography style={{fontFamily:'Helvetica Bold', lineHeight:1}} variant='h3'>{props.votes}</Typography>
                <Typography style={{fontFamily:'Helvetica Bold'}} variant='h5'>
                    /{maxRobotVotes}
                </Typography>
            </div>
            <div style={{
                width:'100%',
                height:34,
                borderRadius: 8,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#D8DADB',
                padding:2,
                direction:"column",
                display:'flex',
                alignItems: 'center',      
            }}>
                <div
                    style={{
                            //Should be props.votes/maxRobotVotes*100
                        width: `${props.votes/maxRobotVotes*100}%`,
                        height:'100%',
                        backgroundColor: '#414242',
                        borderRadius: 5,
                }}
                >
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
