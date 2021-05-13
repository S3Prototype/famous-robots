import React, {useRef, useState} from 'react'
import {Grid, Box, Button, Card, Typography, TextField, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import uploadIcon from '../../images/Admin/upload1.png'

const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:400,
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))


function AddRobotCard(props) {
    const classes = useStyles()

    const basicButtonStyles = {
        fontFamily:'Helvetica Bold', 
        minHeight: 50, 
        minWidth:100
    }
    
    const fileRef = useRef(null)

    const starterImage = props.robot ? props.robot.image : null
    const starterName = props.robot ? props.robot.name : ''
    const [previewImage, setPreviewImage] = useState(starterImage)
    const newRobotNameRef = useRef('')
    const [newRobotName, setNewRobotName] = useState(newRobotNameRef.current.value)
    const checkIfShouldDisable = ()=>(newRobotName == starterName || newRobotName == '' || previewImage == starterImage)
    const [disableAddButton, setDisableAddButton] = useState(checkIfShouldDisable())
    

    const updateNewRobotName = (e)=>{
        setNewRobotName(e.target.value)
        if(e.target.value == '' || e.target.value == starterName)
            setDisableAddButton(true)
        else 
            setDisableAddButton(checkIfShouldDisable())
    }

    const clearValues  = ()=>{
        setPreviewImage(starterImage)
        newRobotNameRef.current.value = ''
        setDisableAddButton(true)
        setNewRobotName(starterName)
    }

    const uploadCard = ()=>{
        console.log(previewImage)
    }

    return (
    // Break this stuff into local components stored in this file. Goodness.
        <Grid lg={4} md={5} item>
            <Card elevation={2} className={classes.robotCard}>                                
                <Grid direction="column" style={{minWidth: props.imgWidth}} alignItems="center" container>
                    <Typography className={classes.robotName}>
                        Add Robot
                    </Typography>
                    <Grid container style={{minHeight:349, maxWidth:'85%'}}
                        direction="column" justify="space-evenly"
                    >
                        <input type="file" ref={fileRef}
                            style={{display:'none'}}
                            onChange={(e)=>{
                                const file = e.target.files[0]
                                if(file){
                                    const reader = new FileReader()
                                    reader.addEventListener('load', function go(){setPreviewImage(this.result)})
                                    reader.readAsDataURL(file)
                                }                                   
                            }}
                        />
                            <TextField onChange={updateNewRobotName} inputRef={newRobotNameRef} defaultValue={starterName} placeholder={starterName} variant="outlined" label="Name" />
                        {
                            previewImage ?
                            <Box style={{position:'relative', display:'flex', justifyContent:'center'}}>
                                <Typography style={{position:'absolute', backgroundColor:'rgba(65, 66, 66, 0.8)', color:'white', fontFamily:'Helvetica Bold', fontSize:20, textAlign:'center', zIndex:5, top:'50%', width:'100%', borderRadius:30}}>Choose an image</Typography>
                                <img onClick={()=>fileRef.current.click()} src={previewImage} 
                            style={{maxHeight:'90%', maxWidth: '90%',}}
                                />
                            </Box>
                                :
                            <Box onClick={()=>fileRef.current.click()} style={{borderRadius: 10, backgroundColor: '#F4F6F8', borderStyle: 'dashed', width: '100%', height: 200}}>
                                <Grid container style={{rowGap:10, minHeight:"100%"}} justify="center" direction="column" alignItems="center">
                                    <img src={uploadIcon} style={{maxWidth:40}}/>
                                    <Typography style={{fontSize:20,}}>
                                        Select image to upload
                                    </Typography>
                                </Grid>
                            </Box>
                        }
                    </Grid>
                    <Grid style={{columnGap:20}} justify="center" container>
                        {
                            starterImage ?
                            <>
                                <Button onClick={()=>props.updateAddRobotCards({type:'remove', id:props.robot.id})} style={basicButtonStyles}>
                                    Cancel
                                </Button>                           
                                <Button style={basicButtonStyles} color="primary" variant="contained">
                                    Save
                                </Button> 
                            </>
                                :
                            <>
                                <Button onClick={clearValues} style={basicButtonStyles}>
                                    Clear
                                </Button>                           
                                <Button onClick={uploadCard} disabled={disableAddButton} style={basicButtonStyles} variant="contained">
                                    Add Robot
                                </Button>   
                            </>
                        }
                    </Grid>          
                </Grid>
            </Card>
        </Grid>
    )
}

export default AddRobotCard
