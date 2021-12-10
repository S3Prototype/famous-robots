import React, {useRef, useState} from 'react'
import {Grid, Box, Button, Card, Typography, TextField} from '@material-ui/core'
import { Dialog, Modal, makeStyles, CircularProgress} from '@material-ui/core'
import uploadIcon from '../../images/Admin/upload1.png'
import { useRobotContext } from '../../contexts/RobotContext'
import { useUserContext } from '../../contexts/UserContext'
import ErrorMessage from '../Errors/ErrorMessage'
import MondoPopover from '../CustomPopovers/MondoPopover'

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

    const gridRef = useRef(null)

    const [robotList, setRobotList] = useState(robotSet.robots)

    const {popoverController} = props

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
            const uploadResult = await fetch('https://famous-robots-backend.onrender.com/robots/add',{
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

            throw new Error(uploadResultJSON.message)
        } catch(err){
            setShouldShowProgress(false)
            return setErrorMessage(`Error uploading robot: ${err.message}`)
        }
    }

    const [shouldShowProgress, setShouldShowProgress] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const editRobotOnServer = async ()=>{

        if(newRobotName === starterName && previewImage === starterImage)
            return setErrorMessage(`Please modify the robot before saving it.`)
            
            setShouldShowProgress(true)
        try{
            const editRequest = await fetch(`https://famous-robots-backend.onrender.com/robots/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    original: props.robot,
                    new:{
                        imageData: previewImage,
                        name: newRobotName || props.robot.name,
                        email: user.data.email,
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
            setErrorMessage(`Error trying to edit robot: ${err.message}`)
            setShouldShowProgress(false)                
            return
        }
    }

    return (
        shouldShowProgress ?
        <Grid  style={{width:400, maxWidth:400, height:520, maxHeight:520}} lg={4} md={5} item ref={gridRef}>
            <Card elevation={2} style={{width:'100%', minHeight:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}> 
                <CircularProgress color="primary" />
            </Card>
        </Grid>
        :
        <Grid style={{width:'100%', maxWidth:400}} item lg={4} md={5}>
            <Card elevation={3} className={classes.robotCard} >                                
                <Grid direction="column" style={{
                        height: 445, maxHeight:500,
                        maxWidth:349, rowGap:10
                    }}
                    alignItems="center" container 
                >
                    <Typography className={classes.robotName}>
                        Add Robot
                    </Typography>
                    <TextField
                        onChange={updateNewRobotName} inputRef={newRobotNameRef} 
                        defaultValue={starterName} placeholder={starterName} 
                        variant="outlined" label="Name" style={{width:'90%'}}
                    />
                    <Grid container style={{
                        height:280, maxHeight:280, rowGap:20,
                        maxWidth: '100%', position:'relative', 
                    }}
                        direction="column" justify="center" alignItems="center"
                    >
                        {
                        previewImage &&
                            <Typography style={{
                                position:'absolute', backgroundColor:'rgba(65, 66, 66, 0.8)',
                                color:'white', fontFamily:'Helvetica Bold', fontSize:20, 
                                textAlign:'center', zIndex:5, top:'50%',
                                width:'100%', borderRadius:30
                            }} onClick={()=>fileRef.current.click()}
                            >
                                Choose an image
                            </Typography>
                        }
                        {
                            previewImage ?
                            <Box onClick={()=>fileRef.current.click()} 
                                style={{
                                    display:'flex',
                                    maxWidth:'100%', justifyContent:'center',
                                    alignItems:"center"
                                }}>
                                <img src={previewImage} 
                                    style={{maxHeight:270, maxWidth: '100%',}}
                                />
                            </Box>
                                :
                            <Box onClick={()=>fileRef.current.click()} 
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
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}  />
        </Grid>
    )
}

export default AddRobotCard
