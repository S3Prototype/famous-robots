import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

export const resetPopover = ({popoverText, setPopoverElement})=>{
    popoverText.current = ''
    setPopoverElement(null)
}

export const showPopover = ({text, ref, popoverText, setPopoverElement})=>{
    popoverText.current = text
    setPopoverElement(ref)
}

function MondoPopover(props) {
    return (
        <Popover anchorOrigin={{vertical: 'bottom', horizontal:'left'}}
            open={props.open} anchorEl={props.anchorEl} onClose={props.closeMethod}>
            <Typography style={{fontWeight:'bold', color:'red', padding:'2%', width:310, maxWidth:'100%'}}>
                {props.message}
            </Typography>
        </Popover>
    )
}

export default MondoPopover
