import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'
import general from '../GeneralProperties/generalLoginProperties'

const getTabletLoginStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        minWidth: '79.03%',
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
        minWidth: '82.37%',
        maxWidth: '82.37%',
        minHeight: '25.82%',
        maxHeight: '25.82%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 0,
        marginBottom: 0,
    },

    textInput: {
        fontSize: 40
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

export default getTabletLoginStyles