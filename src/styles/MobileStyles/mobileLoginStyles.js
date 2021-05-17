import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from '../mondoTheme'

const mobileLoginStyles = makeStyles((theme = mondoTheme)=>({
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
        minHeight: '35.82%',
        maxHeight: '40%',
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
        minHeight:'50%',
        maxHeight:'50%',
    },
    
    textInput: {
        maxHeight: '36.15%'
    },

    buttonContainer: {
        minHeight: '20.47%',
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

export default mobileLoginStyles