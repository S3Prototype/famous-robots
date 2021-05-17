import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'
import modalStyles from '../modalStyles'
import general from '../GeneralProperties/generalLoginProperties'

const getDesktopLoginStyles = makeStyles(({
    modal: {
        width: '42.15%',
        minHeight: '69.62vh',
        maxHeight: '80.62vh',
        position: 'relative',
        top: '8.8vh',
        ...general.modal
    },

    modalUIContainer: general.modalUIContainer,

    mondoLogo:{
        maxWidth: '38.38%',
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '50.82%',
        maxHeight: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        rowGap:20,
        padding: 0,
        marginBottom: 0,
    },

    textInputContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minHeight:'41%',
        maxHeight:'51%'
    },

    textInput: {
        maxHeight: '36.15%'
    },

    buttonContainer: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '32.47%',
        maxHeight: '32.47%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 0,
        marginBottom: 0,
    },

    button:{
        textTransform: 'none',
        fontFamily: 'Helvetica Bold',
        height: '43.83%',
        minWidth:'100%'
    },

}))

export default getDesktopLoginStyles