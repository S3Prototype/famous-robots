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

    modalUIContainer:{
        width:'100%',
        height:'100%',
        // backgroundColor:'red',
    },

    mondoLogo:{
        width: '38.38%',
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
        justifyContent: 'flex-start',
        rowGap:'12%',
        padding: 0,
        marginBottom: 0,
    },
    
    textInputContainer: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minHeight:'45%',
        maxHeight:'45%',
    },

    textInput: {
        fontSize: 40
    },

    buttonContainer: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '30.47%',
        maxHeight: '30.47%',
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

export default getTabletLoginStyles