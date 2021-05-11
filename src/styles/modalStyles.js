import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from './mondoTheme'

const modalStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        textAlign: 'center',
        width: '42.15%',
        maxHeight: 713,
        backgroundColor: theme.palette.white.main,
        overflow: 'hidden',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: "0px 23px 30px -9px #0000002B",
        padding: 0,
        marginBottom: 0,
    },

    mondoLogo:{
        maxWidth: 233,
        padding: 0,
        marginBottom: 0,
    },

    inputs: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        height: 208,
        minHeight: 208,
        maxHeight: 316,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 0,
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
        fontFamily: 'Helvetica Bold'
    },
}))

export default modalStyles