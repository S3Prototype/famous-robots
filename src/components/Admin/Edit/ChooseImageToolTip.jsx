import React from 'react'
import Typography from '@material-ui/core/Typography'

function ChooseImageToolTip(props) {
    if(!props.previewImage)
        return null

    return (
        <Typography style={{
            position:'absolute', backgroundColor:'rgba(65, 66, 66, 0.8)',
            color:'white', fontFamily:'Helvetica Bold', fontSize:20, 
            textAlign:'center', zIndex:5, top:'50%',
            width:'100%', borderRadius:30
        }} onClick={()=>props.fileRef.current.click()}
        >
            Choose an image
        </Typography>
    )
}

export default ChooseImageToolTip
