import {makeStyles} from '@material-ui/core/styles'
import general from '../GeneralProperties/generalLoginProperties'
import mondoTheme from '../mondoTheme'

const getTabletRegisterStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        minWidth: '79.03%',
        minHeight: '69.62vh',
        maxHeight: '69.62vh',
        position: 'relative',
        paddingTop:'5%',
        top: '8.8vh',
        ...general.modal
    },

    modalUIContainer: general.modalUIContainer,

    mondoLogo:{
        width: '38.38%',        
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '70.82%',
        maxHeight: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        rowGap:'12%',
        padding: 0,
        marginBottom: 0,
    },
    
    textInputContainer: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minHeight:'50%',
    },

    buttonContainer: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '21.47%',
        maxHeight: '21.47%',
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
        fontSize: 24,
        height: '43.83%',
        minWidth:'100%'
    },
}))

export default getTabletRegisterStyles