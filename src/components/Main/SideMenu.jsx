import React, {useContext, useRef} from 'react'
import {Grid, MenuItem} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/styles'
import xIcon from '../../images/MobileNav/x.svg'
import {Typography} from '@material-ui/core'
import {withRouter, BrowserRouter as Router} from 'react-router-dom'
import { UserContext, useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuContainer:{
      position: 'fixed',
      zIndex: 20,
      left: 0,
      top: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
  },
  xIcon: {
      position: 'fixed',
      top: '3vh',
      right: '8vw',
  },
  menuItem: {
      width: '100vw',
      height: '15vh',
      maxHeight: '30vh',
      fontSize: 48,
  },
  menuButton: {
        width: '100%',
        fontSize:40,
        // backgroundColor: 'pink',
        color:'white', 
        textAlign: 'center',
        fontFamily:'Helvetica Bold',
    }
}));

function SideMenu(props) {

    const user = useUserContext()
    
    const {history} = props
    
    const classes = useStyles()

    const menuItems = 'Robots,Results,Admin,Log Out'.split(',')

    const changePage = (pageURL)=>{
        if(pageURL === 'Log Out') pageURL = 'login'
        closeButtonRef.current.click()        
        history.push(pageURL)
    }

    const handlePageChange = (rawURL)=>{
        if(rawURL === 'Log Out'){
            rawURL = 'log in'
            user.resetUser()
        }     
        if(rawURL === 'Admin'){
            console.log("You chose admin. Are you an admin?", user.data.isAdmin)
            if(!user.data.isAdmin){
                console.log("Well react says you're not an admin, so we're logging you out.")
                user.resetUser()
                rawURL = 'log in'
            }
        }
        changePage(rawURL.split(' ').join('').toLowerCase())
    }

    const closeButtonRef = useRef(null)
    
    const showButtonsForAccountType = (item)=>{
        if(item === 'Admin')
            if(!user.data.isAdmin)
                return null
        if(item === 'Log Out')
            if(!user.data.loggedIn)
                item = 'Log In'
        return(
            <Button size="large" variant="text"
                className={classes.menuButton}
            >
                {item}
            </Button>
        )                
    }

    return (
        <Grid className={classes.menuContainer} direction="vertical" >
            <Grid xs={12} className={classes.menuItem} item> 
                <IconButton ref={closeButtonRef} onClick={()=>props.setShowSideMenu(false)}>
                    <img className={classes.xIcon} src={xIcon}/>
                </IconButton>
            </Grid>
            {
                menuItems.map((item, index)=>{                    
                    if(item === 'Admin')
                        if(!user.data.isAdmin)
                            return null

                    return <Grid xs={12} key={index} item className={classes.menuItem}>
                        <MenuItem onClick={()=>handlePageChange(item)}>
                            {showButtonsForAccountType(item)}                            
                        </MenuItem> 
                    </Grid>
                })
            }

        </Grid>
    )
}

export default withRouter(SideMenu)
