import React from 'react'
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function ErrorMessage(props) {
    const errorMessageBody = (
          <Card style={{maxWidth:'100%', padding:'2%', flexDirection:'column', rowGap:'20%', width:'80%', height:150, maxHeight:'50vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography  variant='h5' style={{textAlign:'center', color:'red'}}>
                {props.errorMessage}
            </Typography>
            <Button
                style={{fontFamily:'Helvetica',}}
                size="large"
                variant="outlined"
                color="primary"
                disableRipple
                onClick={()=>props.setErrorMessage('')}
            >
                Close
            </Button>
          </Card>
      );

    return (
        <Modal
            style={{display:'flex', alignItems:'center', justifyContent:'center'}}
            open={props.errorMessage !== ''}
            onClose={()=>props.setErrorMessage('')}            
        >
            {errorMessageBody}                     
        </Modal>  
    )
}

export default ErrorMessage
