import React, {useEffect, useState} from 'react'
import Robots from '../Robots/Robots'
import Admin from '../Admin/Admin'
import Results from '../Results/Results'
import Login from '../Login/Login'
import NavBar from '../Main/NavBar'
import { useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'
import { autoLogin } from '../../utils/loginMethods'
import ErrorMessage from '../Errors/ErrorMessage'
import PageName from './PageName'
import PageContainer from './PageContainer'
import PageContent from './PageContent'

function Page(props) {

    const user = useUserContext()
    const robotSet = useRobotContext()

    const [userIsValidated, setUserIsValidated] = useState(user.data.isAdmin)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        (async ()=>{
            if(props.pageType !== 'login' && robotSet.updateNeeded)
                try{
                    const robotRequest = await fetch(`https://famousrobots-backend.onrender.com/robots/all`,{
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
                    return setErrorMessage(`Error trying to get all robots: ${err.message}`)
                }

            if(props.pageType === 'admin' || props.pageType === 'Admin')            
                setUserIsValidated(await validateAdmin())
        })()
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
        <NavBar />
        <PageContainer>
            <PageName pageType={props.pageType} name={pageName} />
            <PageContent>             
                {getPage()}
            </PageContent>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        </PageContainer>
        </>
    )
}

export default Page
