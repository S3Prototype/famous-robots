import {makeStyles} from '@material-ui/core/styles'
import general from '../GeneralProperties/generalLoginProperties'
import mondoTheme from '../mondoTheme'

const getMobileRegisterStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        textAlign: 'center',
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'space-evenly',
        position: 'relative',
        top: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: "0px 23px 30px -9px #0000002B",
        padding: 0,
        marginBottom: 0,
    },

    modalUIContainer: general.modalUIContainer,

    mondoLogo:{
        // maxWidth: '38.3%',
        maxWidth: 165,
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '28.82%',
        maxHeight: '28.82%',
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

export default getMobileRegisterStyles