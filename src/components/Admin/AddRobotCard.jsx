import React, {useRef} from 'react'
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
                        onClick={()=>fileRef.current.click()}
                    >
                        <input type="file" ref={fileRef}
                            style={{display:'none'}}
                            onChange={(e)=>{
                             const file = e.target.files[0]
                             if(file){
                                 const reader = new FileReader()
                                 console.log(reader)
                             }   
                            }}
                        />
                        <TextField variant="outlined" label="Name" />
                            {/* Only show the below if image not already added. */}
                        <Box style={{borderRadius: 10, backgroundColor: '#F4F6F8', borderStyle: 'dashed', width: '100%', height: 200}}>
                            <Grid container style={{rowGap:10, minHeight:"100%"}} justify="center" direction="column" alignItems="center">
                                <img src={uploadIcon} style={{maxWidth:40}}/>
                                <Typography style={{fontSize:20,}}>
                                    Select image to upload
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid style={{columnGap:20}} justify="center" container>
                        <Button style={basicButtonStyles}>
                            Clear
                        </Button>                           
                        <Button style={basicButtonStyles} disabled variant="contained">
                            Add Robot
                        </Button>   
                    </Grid>          
                </Grid>
            </Card>
        </Grid>
    )
}

export default AddRobotCard
