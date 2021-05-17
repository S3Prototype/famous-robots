import {useReducer, useRef, useState, useEffect} from 'react'
import { useHistory, withRouter} from 'react-router-dom';
import {useUserContext} from '../../contexts/UserContext'
import {useMediaQuery, Button, Grid, Card, Popover, TextField, Typography} from '@material-ui/core'
import getDesktopLoginStyles from '../../styles/DesktopStyles/desktopLoginStyles'
import coreStyles from '../../styles/coreStyles'
import getMobileLoginStyles from '../../styles/MobileStyles/mobileLoginStyles'
import getTabletLoginStyles from '../../styles/TabletStyles/tabletLoginStyles'
import getDesktopRegisterStyles from '../../styles/DesktopStyles/desktopRegisterStyles'
import getMobileRegisterStyles from '../../styles/MobileStyles/mobileRegisterStyles'
import getTabletRegisterStyles from '../../styles/TabletStyles/tabletRegisterStyles'
import logo from '../../images/LogIn/MR-Logo1.png'
import {loginUser, registerUser } from '../../utils/loginMethods'
import { useRobotContext } from '../../contexts/RobotContext'
import ErrorMessage from '../Errors/ErrorMessage';
import MondoPopover, {resetPopover, showPopover} from '../CustomPopovers/MondoPopover';
import LoginUIContainer from './LoginUIContainer';
import LoginInputContainer from './LoginInputContainer';
import LoginButtonContainer from './LoginButtonContainer';

const validateEmail = (email)=>{

    if(email === 'Admin') return true

    const tld = email.slice(email.lastIndexOf('.')+1)

    if(!email.includes('@') || tld.length > 6){
        // console.log("Email missing @ or too long")
        return false
    }
        
    const numberCheckRegex = /\d/g;
    if(numberCheckRegex.test(tld)){
        // console.log("Email had numbers")
        return false
    }

    const specialCharacterCheckRegex = /\W|_/g
    if(specialCharacterCheckRegex.test(tld)){
        // console.log("Email had special characters")
        return false
    }

    return true
}

function Login(props) {
        //* Styling *//
    const styles = coreStyles()
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

    const inputSize = useRef({})
    const inputSizeTable = {
        'desktop': {style:{height:10}},
        'tablet': {style: {height:40, fontSize:30}}
    }
    const buttonTextSize = useRef({})
    const buttonTextSizeTable = {
        'desktop': {},
        'tablet': {style: {color:'red'}}
    }

    function getAppropriateStyles(modalType){        
        let display = 'desktop'
        if(isTablet) display = 'tablet'
        if(isMobile) display = 'mobile'
        inputSize.current = inputSizeTable[display]  
        buttonTextSize.current = buttonTextSizeTable[display]
        return styleTable[modalType][display]
    }

    useEffect(() => {
        setModalStyles(currModal.current)
    }, [isTablet, isMobile]);
    
    const currModal = useRef('login')

    const [modalStyles, setModalStyles] = useReducer((oldState, modalType)=>{
        currModal.current = modalType
        return getAppropriateStyles(modalType)
    }, getAppropriateStyles('login'))

        //* Input Processing *//
    const user = useUserContext()
    const robotSet = useRobotContext()

    const history = useHistory()

        //use ref instead of state to prevent needless re-render
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const popoverText = useRef('')
    const [popoverElement, setPopoverElement] = useState(null)
    const emailTextFieldRef = useRef(null)

    const [errorMessage, setErrorMessage] = useState('')
        
    const validateInputs = ()=> {
        const emailVal = emailRef.current.value
            //nameref.current might be null if we're logging in.
        const nameVal = nameRef.current ? nameRef.current.value : null
        const passwordVal = passwordRef.current.value

        if(!emailVal || !validateEmail(emailVal)){
            showPopover({text: `Please enter a valid email address`, ref: emailRef.current, popoverText, setPopoverElement})
            return false
        }

        if(currModal.current === 'register')
            if(!nameVal || nameVal.length <= 2){
                showPopover({text: `Names must be more than 2 characters`, ref: nameRef.current, popoverText, setPopoverElement})
                return false
            }
        
        if(!passwordVal || passwordVal.length <= 5){
            showPopover({text: `Passwords must be 6 characters or more`, ref: passwordRef.current, popoverText, setPopoverElement})
            return false
        }
        
        return true
    }

    const generateInputValueObject = ()=>({
        email: emailRef.current.value,
        name: nameRef.current ? nameRef.current.value : null,
        password: passwordRef.current.value
    })

        //* Fetch Methods *//    
    const isRegistering = useRef(false)
    const registerClick = async () => {        
        if(currModal.current === 'register'){
            if(!validateInputs())
                return
    
            const inputs = generateInputValueObject()

            isRegistering.current = true

            try{
                //First clear out the user.
                user.eraseLocalData()
                user.resetUser()
                //Then register the user
                const registerResult = await registerUser(inputs) 
                user.updateUser(registerResult.userData)
                robotSet.updateRobots(registerResult.robotSet)
                if(registerResult.userData.isAdmin)
                    return history.push('/admin')
                else            
                    return history.push('/robots')
            } catch (err) {
                return setErrorMessage(`Error registering: ${err.message}`)
            } finally {
                isRegistering.current = false
            }
        }
        
        if(currModal.current !== 'register'){
            console.log("Modal changing from "+currModal.current+" to register")
            return setModalStyles('register')
        }

    }

    const isLoggingIn = useRef(false)
    const loginClick = async ()=> {
        if(currModal.current === 'login'){
            if(!validateInputs()){
                return
            }
            isLoggingIn.current = true
            const inputs = generateInputValueObject()
            try{
                const loginResult = await loginUser(inputs)
                user.updateUser(loginResult.userData)
                robotSet.updateRobots(loginResult.robotSet)
                // console.log("Done logging in. TIme to push /")
                if(user.data.isAdmin)
                    return history.push('/admin')
                else
                    return history.push('/robots')
            } catch (err){
                return setErrorMessage(`Failed to log in: ${err.message}`)
            } finally {
                isLoggingIn.current = false
            }
        }

        if(currModal.current !== 'login'){
            console.log("Modal changing from "+currModal.current+" to login")
            setModalStyles('login')
        }
    }

        //* Props for containers *//
            //* Input container
    const inputRefs = {
        emailTextFieldRef,
        emailRef,
        passwordRef,
        nameRef,
        currModal,
    }

    const processEnterKey = (e)=>{
        if (e.key === 'Enter' || e.keyCode === 13) {
            submit(e, currModal.current)
        }
    }

    const inputStyles = {
        inputProps: inputSize.current,
        inputClass: modalStyles.textInput,
        containerClass: modalStyles.inputContainer,
        textInputContainerClass: modalStyles.textInputContainer
    }
            //* Button container
    const buttonRefs = {
        isLoggingIn,
        isRegistering,
        buttonTextSize,       
    }
    
    const submit = (e, type)=>{
        e.preventDefault()
        switch(type){
            case 'register':
                return registerClick()
            default:
                return loginClick()
        }
    }

    return (
      <Grid container className={styles.appBackground}>  
        <Card item elevation={2} className={modalStyles.modal}>
            <LoginUIContainer className={modalStyles.modalUIContainer}>
                <img src={logo} alt="Mondo Robot logo" className={modalStyles.mondoLogo}/>
                <form onSubmit={(e)=>e.preventDefault()} className={modalStyles.inputContainer}>
                    <LoginInputContainer onKeyPress={processEnterKey} inputStyles={inputStyles} inputRefs={inputRefs} />
                    <LoginButtonContainer submit={submit} buttonRefs={buttonRefs} modalStyles={modalStyles} />   
                </form>
                <MondoPopover 
                    open={popoverText.current !== ''} 
                    anchorEl={popoverElement} 
                    closeMethod={()=>resetPopover({popoverText , setPopoverElement})}
                    message={popoverText.current} 
                /> 
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />          
            </LoginUIContainer>
        </Card>
      </Grid>
    )
}

export default withRouter(Login)

