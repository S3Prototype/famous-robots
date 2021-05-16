import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'
import general from '../GeneralProperties/generalLoginProperties'

const mobileLoginStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        maxHeight: '100vh',
        position: 'relative',
        top: 0,
        ...general.modal
    },

    modalUIContainer: general.modalUIContainer,

    mondoLogo:{
        maxWidth: 165,
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '20.82%',
        maxHeight: '30.82%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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