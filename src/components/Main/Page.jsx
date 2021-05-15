import React, {useEffect, useState} from 'react'
import {Typography, Grid} from '@material-ui/core'
import Robots from '../Robots/Robots'
import Admin from '../Admin/Admin'
import Results from '../Results/Results'
import Login from '../Login/Login'
import NavBar from '../Main/NavBar'
import { useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'
import { autoLogin } from '../../utils/loginMethods'

function Page(props) {

    const user = useUserContext()
    const robotSet = useRobotContext()

    const [userIsValidated, setUserIsValidated] = useState(user.data.isAdmin)

    useEffect(async () => {
        if(props.pageType !== 'login' && robotSet.updateNeeded)
            try{
                const robotRequest = await fetch(`https://famous-robots.vercel.app/robots/all`,{
                    method: `GET`,
                    headers: {
                        'authorization': `Bearer ${user.data.accessToken}`,
                        'content-type': `application/json`,
                    }
                })
                const status = robotRequest.status
                const robotJSON = await robotRequest.json()
                if(status === 200){
                    robotSet.updateRobots(robotJSON.robots)
                    return
                }

                throw new Error(robotJSON.message)
            } catch(err) {
                return //console.log(`Error trying to get all robots`, err)
            }

        if(props.pageType === 'admin' || props.pageType === 'Admin')            
            setUserIsValidated(await validateAdmin())

    }, []);

    const validateAdmin = async()=>{
        if(!user.data.isAdmin || !user.data.loggedIn){
            const autoLoginSuccess = await autoLogin(user.data)
            if(!autoLoginSuccess.userData)
                return false

            const newUserData = autoLoginSuccess.userData
            newUserData.accessToken = user.data.accessToken 
            newUserData.refreshToken = user.data.refreshToken

            user.updateUser(newUserData)
            return true
        }

        return true
        
    }

    const getPage = ()=>{ 
        if(!user.data.loggedIn)
            return <Login  />
        switch(props.pageType){
            case 'robots':
                return <Robots  />
            case 'admin':
                return <Admin />
            case 'results':
                return <Results  />
            case 'login':
                return <Login  />
        }
    }

    const pageName = props.pageType.replace(/^\w/, (c) => c.toUpperCase())

    return (
        <>
        {
                // Don't show the navbar on login page
            user.data.loggedIn &&
                <NavBar />
        }
        <Grid direction="column" alignItems="center" style={{
                backgroundColor: '#F4F6F8',
                maxWidth:'100vw',
            }}
        container>
            {
                    //Don't show page name on login
                user.data.loggedIn &&
                <Grid item style={{margin: '3vw', marginBottom:'6vw', minWidth: '90%', maxWidth: '90%',}}
                >
                    <Typography variant="h3" style={{fontFamily: 'Helvetica Bold', maxWidth:'80%'}}
                    >
                        {pageName}
                    </Typography>
                </Grid>
            }
            <Grid style={{maxWidth:'90%'}} justify="center"
                  spacing={2} container
            >                
                {getPage()}
            </Grid>
        </Grid>
        </>
    )
}

export default Page
