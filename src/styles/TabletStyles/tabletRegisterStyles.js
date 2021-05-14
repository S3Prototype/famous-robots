import {makeStyles} from '@material-ui/core/styles'
import { Height } from '@material-ui/icons'
import mondoTheme from '../mondoTheme'

const getTabletRegisterStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        textAlign: 'center',
        minWidth: '79.03%',
        minHeight: '81.64vh',
        maxHeight: '81.64vh',
        backgroundColor: theme.palette.white.main,
        overflow: 'hidden',
        position: 'relative',
        top: '8.8vh',
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

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '47.48%',
        maxHeight: '47.48%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 0,
        marginBottom: 0,
    },

    buttonContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '17.46%',
        maxHeight: '17.46%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 0,
    },

    button:{
        textTransform: 'none',
        fontFamily: 'Helvetica Bold',
        height: '43.83%'
    },
}))

export default getTabletRegisterStyles