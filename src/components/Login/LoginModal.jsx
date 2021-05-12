import {useReducer, useRef, useEffect, useState, useContext} from 'react'
import {UserContext} from '../../contexts/UserContext'
import {Button, Grid, TextField} from '@material-ui/core'
import getDesktopLoginStyles from '../../styles/DesktopStyles/desktopLoginStyles'
import getMobileLoginStyles from '../../styles/MobileStyles/mobileLoginStyles'
import getTabletLoginStyles from '../../styles/TabletStyles/tabletLoginStyles'
import getDesktopRegisterStyles from '../../styles/DesktopStyles/desktopRegisterStyles'
import getMobileRegisterStyles from '../../styles/MobileStyles/mobileRegisterStyles'
import getTabletRegisterStyles from '../../styles/TabletStyles/tabletRegisterStyles'
import logo from '../../images/LogIn/MR-Logo1.png'
import {useMediaQuery} from '@material-ui/core'


function LoginModal() {

    const userData = useContext(UserContext)

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

    useEffect(async ()=>{
        userData.username = "Admin"
        userData.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjIwODQ3Njg0LCJleHAiOjE2MjA4OTA4ODR9.Iw3iwlW-VYem2GtYncDPlzzKxPvVj431bur70uk4VYM"
        if(!userData.accessToken)
            return

        let result = null
        try{
            result = await fetch('http://localhost:3100/users/login',
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${userData.accessToken}`,
                    'content-type':'application/json'
                },
                body: JSON.stringify({username: userData.username})
            })
            console.log("Status", result.status)
            console.log("Result of instant fetch:", await result.json())
        } catch(err){
            console.log(err)
        }
    },[])

        //use ref instead of state to prevent needless re-render
    const currModal = useRef('login')
    const inputSize = useRef({})

    const [modalStyles, setModalStyles] = useReducer((oldState, modalType)=>{
        // setCurrModal(modalType)
        currModal.current = modalType
        return getAppropriateStyles(modalType)
    }, getAppropriateStyles('login'))
    
    const registerClick = ()=> {
        setModalStyles('register')
    }
    const loginClick = ()=> {
        setModalStyles('login')
    }

    return (
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
                        />
                    }

                    <TextField
                        inputProps={inputSize.current}
                        className={modalStyles.textInput}
                        label="Email"
                        variant="outlined"
                        placeholder="ms.robot@mondorobot.com"
                    />

                    <TextField
                        inputProps={inputSize.current}
                        type="password"                    
                        label="Password"
                        variant="outlined"
                        placeholder="Password Here"
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
    )
}

export default LoginModal
