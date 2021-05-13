import React, {useEffect} from 'react'
import {Typography, Grid} from '@material-ui/core'
import Robots from '../Robots/Robots'
import Admin from '../Admin/Admin'
import Results from '../Results/Results'
import Login from '../Login/Login'
import NavBar from '../Main/NavBar'
import { useUserContext } from '../../contexts/UserContext'
import { useRobotContext } from '../../contexts/RobotContext'
import { getAllRobots } from '../../utils/robotInteractionMethods'

function Page(props) {

    const user = useUserContext()
    const robotSet = useRobotContext()

    useEffect(async () => {
        if(robotSet.updateNeeded)
            try{
                const robotRequest = await fetch(`http://localhost:3100/robots/all`,{
                    method: `GET`,
                    headers: {
                        'authorization': `Bearer ${user.data.accessToken}`,
                        'content-type': `application/json`,
                    }
                })
                console.log("Request ended successfully")
                const status = robotRequest.status
                const robotJSON = await robotRequest.json()
                if(status === 200){
                    robotSet.updateRobots(robotJSON.robots)
                    console.log(`Our new robots and user voted already are:`, robotSet, user.data.votedForAlready)
                    return
                }

                throw new Error(robotJSON.message)
            } catch(err) {
                console.log(`Error trying to get all robots`, err)
            }
    }, []);

    const getPage = ()=>{
        switch(props.pageType){
            case 'robots':
                return <Robots />
            case 'admin':
                return <Admin />
            case 'results':
                return <Results />
            case 'login':
                return <Login />
        }
    }

    const pageName = props.pageType.replace(/^\w/, (c) => c.toUpperCase());

    return (
        <>
        {
            props.pageType !== 'login' &&
                <NavBar />
        }
        <Grid direction="column" alignItems="center" style={{
                backgroundColor: '#F4F6F8',
                maxWidth:'100vw',
            }}
        container>
            {
                props.pageType !== 'login' &&
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
