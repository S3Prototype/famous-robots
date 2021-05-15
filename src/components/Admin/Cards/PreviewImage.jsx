import React from 'react'
import Box from '@material-ui/core/Box'
function PreviewImage(props) {

    return (        
        <Box onClick={()=>props.fileRef.current.click()} 
            style={{
                display:'flex',
                maxWidth:'100%', justifyContent:'center',
                alignItems:"center"
            }}>
            <img src={props.previewImage} 
                style={{maxHeight:270, maxWidth: '100%',}}
            />
        </Box>
    )
}

export default PreviewImage
