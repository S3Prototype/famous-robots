import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'
import modalStyles from '../modalStyles'
import general from '../GeneralProperties/generalLoginProperties'

const getDesktopLoginStyles = makeStyles(({
    modal: {
        width: '42.15%',
        minHeight: '69.62vh',
        maxHeight: '69.62vh',
        position: 'relative',
        top: '8.8vh',
        ...general.modal
    },

    modalUIContainer: general.modalUIContainer,

    mondoLogo:{
        maxWidth: 233,
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '25.82%',
        maxHeight: '25.82%',
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

export default getDesktopLoginStyles