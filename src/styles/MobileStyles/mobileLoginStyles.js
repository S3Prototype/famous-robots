import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'

const mobileLoginStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        textAlign: 'center',
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        maxHeight: '100vh',
        backgroundColor: theme.palette.white.main,
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'relative',
        top: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: "0px 23px 30px -9px #0000002B",
        padding: 0,
        marginBottom: 0,
    },

    mondoLogo:{
        maxWidth: 165,
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '20.82%',
        maxHeight: '20.82%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 0,
        marginBottom: 0,
    },

    textInput: {
        maxHeight: '36.15%'
    },

    buttonContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '20.47%',
        maxHeight: '20.47%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 0,
    },

    button:{
        textTransform: 'none',
        fontFamily: 'Helvetica Bold',
        height: '43.83%',
    },
}))

export default mobileLoginStyles