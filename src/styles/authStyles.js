import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from './mondoTheme'

const authStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        textAlign: 'center',
        width: '42.15%',
        height: '81.64vh',
        maxHeight: '81.64vh',
        backgroundColor: theme.palette.white.main,
        overflow: 'hidden',
        position: 'relative',
        top: '9.47vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: "0px 23px 30px -9px #0000002B",
        padding: 0,
        marginBottom: 0,
    },

    mondoLogo:{
        maxWidth: '38.3%',
        padding: 0,
        marginBottom: 0,
    },

    inputs: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '28.89%',
        maxHeight: '28.89%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 0,
    },

    buttonContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '20.4%',
        maxHeight: '20.4%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 0,
    },

    button:{
        textTransform: 'none',
        fontFamily: 'Helvetica Bold'
    },
}))

export default authStyles