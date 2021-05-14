import {useReducer, useRef, useEffect} from 'react'
import { useHistory, withRouter} from 'react-router-dom';
import {useUserContext} from '../../contexts/UserContext'
import {Button, Grid, TextField} from '@material-ui/core'
import getDesktopLoginStyles from '../../styles/DesktopStyles/desktopLoginStyles'
import coreStyles from '../../styles/coreStyles'
import getMobileLoginStyles from '../../styles/MobileStyles/mobileLoginStyles'
import getTabletLoginStyles from '../../styles/TabletStyles/tabletLoginStyles'
import getDesktopRegisterStyles from '../../styles/DesktopStyles/desktopRegisterStyles'
import getMobileRegisterStyles from '../../styles/MobileStyles/mobileRegisterStyles'
import getTabletRegisterStyles from '../../styles/TabletStyles/tabletRegisterStyles'
import logo from '../../images/LogIn/MR-Logo1.png'
import {useMediaQuery} from '@material-ui/core'
import {loginUser, registerUser } from '../../utils/loginMethods'

const validateEmail = (email)=>{
  

    if(email === 'Admin') return true

    const tld = email.slice(email.lastIndexOf('.')+1)

    if(!email.includes('@') || tld.length > 6){
        console.log("Email missing @ or too long")
        return false
    }
        
    const numberCheckRegex = /\d/g;
    if(numberCheckRegex.test(tld)){
        console.log("Email had numbers")
        return false
    }

    const specialCharacterCheckRegex = /\W|_/g
    if(specialCharacterCheckRegex.test(tld)){
        console.log("Email had special characters")
        return false
    }

    return true
}

function Login(props) {
    const styles = coreStyles()

    const user = useUserContext()

    const history = useHistory()

    // const isTablet = useMediaQuery('(max-device-width: 1024px)')
    const isMobile = useMediaQuery('(max-device-width: 700px)')
    const isTablet = useMediaQuery('(max-device-width: 1024px)')
    const styleTable = {
        'login': {
            'tablet': getTabletLoginStyles(),
            'mobile': getMobileLoginStyles(),
            'desktop': getDesktopLoginStyles()
        },
        'register': {
            'tablet': getTabletRegisterStyles(),
            'mobile': getMobileRegisterStyles(),
            'desktop': getDesktopRegisterStyles()
        }
    }

    const inputSizeTable = {
        'desktop': {},
        'tablet': {style: {fontSize: 25}}
    }

    function getAppropriateStyles(modalType){        
        let display = 'desktop'
        if(isTablet) display = 'tablet'
        if(isMobile) display = 'mobile'
        inputSize.current = inputSizeTable[display]  
        return styleTable[modalType][display]
    }

    useEffect(() => {
        setModalStyles(currModal.current)
    }, [isTablet, isMobile]);

        //use ref instead of state to prevent needless re-render
    const currModal = useRef('login')
    const inputSize = useRef({})
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [modalStyles, setModalStyles] = useReducer((oldState, modalType)=>{
        currModal.current = modalType
        return getAppropriateStyles(modalType)
    }, getAppropriateStyles('login'))

    const validateInputs = ()=> {
        const emailVal = emailRef.current.value
            //nameref.current might be null if we're logging in.
        const nameVal = nameRef.current ? nameRef.current.value : null
        const passwordVal = passwordRef.current.value

        const errorTemplate = (issue)=>`Please enter a valid ${issue}.`

        console.log("Email is", emailVal)
        if(!emailVal || !validateEmail(emailVal)){
            console.log("Email is messed up?")
            // popup modal with this text: errorTemplate(`email address`)
            return false
        }

            //only check the name if they're registering
        if(currModal.current === 'register')
            if(!nameVal || nameVal.length <= 2){
                console.log("Something wrong with name?", nameVal, nameVal.length)
                // popup modal with this text: errorTemplate(`name`)
                return false
            }
        
        if(!passwordVal || passwordVal.length <= 5){
            // popup modal with this text: errorTemplate(`password`)
            return false
        }
        
        return true
    }

    const generateInputValueObject = ()=>({
        email: emailRef.current.value,
        name: nameRef.current ? nameRef.current.value : null,
        password: passwordRef.current.value
    })
    
    const registerClick = async () => {
        console.log("Curr modal", currModal.current)
        
        if(currModal.current === 'register'){
            if(!validateInputs()){
                //pop up modal
                return
            }
    
            const inputs = generateInputValueObject()

            try{
                //First clear out the user.
                user.eraseLocalData()
                user.resetUser()
                //Then register the user
                const registerResult = await registerUser(inputs)            
                if(registerResult !== 'success')
                    throw new Error(`Failed to register ${emailRef.current.value}. Please try again.`)
    
                console.log("Trying to log in now.")
                const loginResult = await loginUser(inputs)
                console.log("We have logged in.")
                user.updateUser(loginResult.userData)
                console.log("We've updated the user. It's", user.data)
                history.push('/')
            } catch (err) {
                console.log(`Error signing user up.`, err)
                //return (make a popup modal with the err as text.)
            }
        }
        
        if(currModal.current !== 'register'){
            return setModalStyles('register')
        }

    }

    const loginClick = async ()=> {
        if(currModal.current === 'login'){
            if(!validateInputs()){
                //popup modal 
                return
            }
    
            const inputs = generateInputValueObject()
            try{
                const loginResult = await loginUser(inputs)
                user.updateUser(loginResult.userData)
                console.log("Done logging in. TIme to push /")
                if(user.data.isAdmin)
                    return history.push('/admin')
                else
                    return history.push('/robots')
            } catch (err){
                console.log("Failed to log in", err)
                //return (make a popup modal with the err as text.)
            }
        }

        if(currModal.current !== 'login'){
            setModalStyles('login')
        }

    }

    return (
      <Grid container className={styles.appBackground}>  
        <Grid item

            style={{backgroundColor: 'white', height: 713}}
            elevation={1} className={modalStyles.modal}
        >
            <Grid
                style={{height:'100%',}}
                container direction="column"
                justify="space-evenly" alignItems="center"

            >
                <img src={logo} alt="Mondo Robot logo" className={modalStyles.mondoLogo}/>
                <div className={modalStyles.inputContainer}>

                    {
                        currModal.current === 'register' &&
                        <TextField
                            inputProps={inputSize.current}
                            className={modalStyles.textInput}
                            label="Full Name"
                            variant="outlined"
                            placeholder="Janet Yellen"
                            inputRef={nameRef}
                        />
                    }

                    <TextField
                        inputProps={inputSize.current}
                        className={modalStyles.textInput}
                        label="Email"
                        variant="outlined"
                        placeholder="ms.robot@mondorobot.com"
                        inputRef={emailRef}
                    />

                    <TextField
                        inputProps={inputSize.current}
                        type="password"                    
                        label="Password"
                        variant="outlined"
                        placeholder="Password Here"
                        inputRef={passwordRef}
                    />
                </div>

                <div className={modalStyles.buttonContainer}>
                    <Button disableElevation
                        className={modalStyles.button}
                        classes={modalStyles.blackButton}
                        size="large"
                        variant="contained"
                        color="primary"
                        disableRipple
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
                        onClick={registerClick}
                    >
                        Register
                    </Button> 
                </div>                   
            </Grid>
        </Grid>
      </Grid>
    )
}

export default withRouter(Login)

