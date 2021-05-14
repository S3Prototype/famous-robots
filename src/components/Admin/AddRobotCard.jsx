import React, {useRef, useState} from 'react'
import {Grid, Box, Button, Card, Typography, TextField} from '@material-ui/core'
import {makeStyles, CircularProgress} from '@material-ui/core'
import uploadIcon from '../../images/Admin/upload1.png'
import { useRobotContext } from '../../contexts/RobotContext'
import { useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles(them=>({
    robotCard: {
        paddingTop: 30,
        paddingBottom: 30, 
        maxWidth:400,
        display:'flex',
        justifyContent:'center'
    },
    robotName: {
        fontFamily:'Helvetica Bold'
    },
}))

function AddRobotCard(props) {
    const classes = useStyles()

    const robotSet = useRobotContext()
    const user = useUserContext()

    const [robotList, setRobotList] = useState(robotSet.robots)

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
    const [newRobotName, setNewRobotName] = useState(newRobotNameRef.current ? newRobotNameRef.current.value : '')
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

    const uploadCard = async ()=>{
        setShouldShowProgress(true)
        try{
            const uploadResult = await fetch('https://famousrobots-backend.onrender.com/robots/addrobot',{
                method: 'POST',
                body: JSON.stringify({
                    data: previewImage,
                    name: newRobotName,                    
                }),
                headers: {
                    'Content-Type': `application/json`,
                    'authorization': `Bearer ${user.data.accessToken}`

                } 
            })

            const status = uploadResult.status
            const uploadResultJSON = await uploadResult.json()

            if(status === 201 || status === 200){                
                robotSet.updateRobots(uploadResultJSON.robotSet)
                props.setRobotList(uploadResultJSON.robotSet)
                setShouldShowProgress(false)
                return clearValues()
            }

            // modal // console.log(uploadResultJSON.message)
        } catch(err){
            setShouldShowProgress(false)
            // modal // console.log("Error uploading", err)
        }
    }

    const [shouldShowProgress, setShouldShowProgress] = useState(false)
    const editRobotOnServer = async ()=>{
        if(newRobotName === starterName)
            return // console.log(`Please modify the robot before saving.`)
            
            setShouldShowProgress(true)
        try{
            const editRequest = await fetch(`https://famousrobots-backend.onrender.com/robots/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    original: props.robot,
                    new:{
                        imageData: previewImage,
                        name: newRobotName || props.robot.name
                    },  
                }),
                headers: {
                    'Content-Type': `application/json`,
                    'authorization': `Bearer ${user.data.accessToken}`

                },
            })

            const status = editRequest.status
            const editJSON = await editRequest.json()

            if(status === 201 || status === 200){
                robotSet.updateRobots(editJSON.robotSet)
                props.updateAddRobotCards({type:'remove', id: props.robot._id})
                setShouldShowProgress(false)                
                return props.setRobotList(editJSON.robotSet)
            }

            throw new Error(editJSON.message)
        } catch(err) {
            // console.log(`Error trying to edit robot, ${err}`)
            setShouldShowProgress(false)                
            return
        }
    }

    return (
        shouldShowProgress ?
        <Grid lg={4} md={5} item>
            <Card elevation={2} style={{maxWidth:400, minHeight:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}> 
                <CircularProgress color="primary" />
            </Card>
        </Grid>
        :
        <Grid lg={4} md={5} item>
            <Card elevation={3} className={classes.robotCard}>                                
                <Grid direction="column" style={{minHeight: 445, maxHeight:500, minWidth: 324, maxWidth: 324}} alignItems="center" container>
                    <Typography className={classes.robotName}>
                        Add Robot
                    </Typography>
                    <Grid container style={{minHeight:349, maxHeight: 430, maxWidth:'85%'}}
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
                                <Button onClick={()=>props.updateAddRobotCards({type:'remove', id:props.robot._id})} style={basicButtonStyles}>
                                    Cancel
                                </Button>                           
                                <Button onClick={editRobotOnServer} style={basicButtonStyles} color="primary" variant="contained">
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
