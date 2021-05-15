import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import uploadIcon from '../../images/Admin/upload1.png'

function CreateNewRobotButton(props) {
    return (
        <Box onClick={()=>props.fileRef.current.click()} 
                        style={{
                            borderRadius: 10, backgroundColor: '#F4F6F8',
                            borderStyle: 'dashed', width: '80%', height: 200,
                            maxWidth:'95%',
                        }}
                    >
                        <Grid container style={{rowGap:10, minHeight:"100%",}}
                            justify="center" direction="column" alignItems="center"
                        >
                            <img src={uploadIcon} style={{maxWidth:40}}/>
                            <Typography style={{fontSize:20,}}>
                                Select image to upload
                            </Typography>
                        </Grid>
        </Box>
    )
}

export default CreateNewRobotButton
