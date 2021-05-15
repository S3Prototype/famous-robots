import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom'
import { useMediaQuery, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import logo from '../../images/LogIn/MR-Logo1.png'
import SideMenu from './SideMenu'
import { useUserContext } from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuItem: {
      fontFamily: 'Helvetica Bold',
  },
  mainMenuContainer:{
      marginLeft: -20,
      flexGrow: 1,
  },
  mondoLogo: {
      marginRight: theme.spacing(2),
      width: 81,
  },
  mondoLogoMobile: {
      marginRight: theme.spacing(2),
      width: 81,
      flexGrow: 1
  },
  wideMenu: {
      minWidth: '30vw',
      marginRight: '2vw',
  },
}));

const NavBar = (props)=>{
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {history} = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const user = useUserContext()
  
  const changePage = (pageURL) => {
    history.push(pageURL)
    setAnchorEl(null);
  };

  const [showSideMenu, setShowSideMenu] = useState(false)

  const openSideMenu = () => {
      setShowSideMenu(true)
  }

  const handleLogout = ()=>{
    user.resetUser()
    changePage('/login')
  }

    // Don't show navbar if user not logged in
  if(!user.data.loggedIn)
    return null

  return (
      isMobile && showSideMenu ?
        <SideMenu setShowSideMenu={setShowSideMenu} />
        :
        <AppBar elevation={1} color="secondary" position="sticky">
            <Toolbar>
            <IconButton
                edge="start" className={classes.menuButton}
                color="inherit" aria-label="menu"
            >
            </IconButton>
            <Grid className={classes.mainMenuContainer} container>
                <img onClick={()=>changePage('/robots')}  
                    src={logo} alt="Mondo Robot logo"
                    style={isMobile ? {maxWidth:67} : {}}
                    className={classes.mondoLogo}
                />
                {!isMobile &&
                    <>
                        <MenuItem className={classes.menuItem} onClick={()=>changePage('/robots')}>
                          Robots
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={()=>changePage('/results')}>
                          Results
                        </MenuItem>                      
                    </>
                }
            </Grid>          
            {auth && (
                <div>
                {isMobile ?
                    <>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openSideMenu}
                        color="inherit"
                    >            
                        <MenuIcon />
                    </IconButton>
                    </>

                    :
                    <Grid container justify="flex-end" className={classes.wideMenu}>
                        {user.data.isAdmin && <MenuItem onClick={()=>changePage('/admin')}>Admin</MenuItem>}
                        <MenuItem onClick={handleLogout}>{user.data.loggedIn ? `Log Out (${user.data.email})` : 'Log In'}</MenuItem>                
                    </Grid>
                }
                </div>
            )}
            </Toolbar>
        </AppBar>        
  );
}

export default withRouter(NavBar)