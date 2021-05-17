import {makeStyles} from '@material-ui/core/styles'
import general from '../GeneralProperties/generalLoginProperties'
import mondoTheme from '../mondoTheme'

const getMobileRegisterStyles = makeStyles((theme = mondoTheme)=>({
    modal: {
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop:'20%',
        // ...general.modal
    },

    modalUIContainer: {
        height:'100%',
        maxHeight:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        rowGap:'10%',
    },

    mondoLogo:{
        maxWidth: 165,
        padding: 0,
        marginBottom: 0,
    },

    inputContainer: {
        minWidth: '82.3%',
        maxWidth: '82.3%',
        minHeight: '40.82%',
        maxHeight: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        rowGap:'10%',
        padding: 0,
        marginBottom: 0,
    },

    textInputContainer: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minHeight:'70%',
        maxHeight:'70%',
    },
    
    textInput: {
        maxHeight: '36.15%'
    },

    buttonContainer: {
        minHeight: '30.47%',
        minWidth: '100%',
        maxWidth: '100%',
        height: '30.47%',
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

export default getMobileRegisterStyles