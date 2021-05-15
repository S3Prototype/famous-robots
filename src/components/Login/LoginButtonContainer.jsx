import React from 'react'
import Button from '@material-ui/core/Button'

function LoginButtonContainer(props) {
    const {modalStyles} = props
    const {registerClick, loginClick} = props.buttonMethods
    const {isLoggingIn, isRegistering} = props.buttonRefs

    return (
        <div className={modalStyles.buttonContainer}>
            <Button disableElevation
                className={modalStyles.button}
                classes={modalStyles.blackButton}
                size="large"
                variant="contained"
                color="primary"
                disabled={isLoggingIn.current}
                disableFocusRipple
                onClick={loginClick}
            >
                Log in
            </Button>
            <Button
                className={modalStyles.button}
                size="large"
                variant="outlined"
                color="primary"
                disableRipple
                disabled={isRegistering.current}
                onClick={registerClick}
            >
                Register
            </Button> 
        </div>
    )
}

export default LoginButtonContainer
