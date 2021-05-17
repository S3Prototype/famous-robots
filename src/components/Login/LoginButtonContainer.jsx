import React from 'react'
import Button from '@material-ui/core/Button'

function LoginButtonContainer(props) {
    const {modalStyles} = props
    const {isLoggingIn, isRegistering, buttonTextSize} = props.buttonRefs

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
                onClick={(e)=>props.submit(e, 'login')}
                // type="submit"
                id="loginButton"
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
                // type="submit"
                id="registerButton"
                onClick={(e)=>props.submit(e, 'register')}
            >
                Register
            </Button> 
        </div>
    )
}

export default LoginButtonContainer
