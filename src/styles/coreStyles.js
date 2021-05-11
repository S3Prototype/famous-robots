import {makeStyles} from '@material-ui/core/styles'
import mondoTheme from './mondoTheme'

const coreStyles = makeStyles((theme = mondoTheme)=>({
    appBackground: {
        backgroundColor: theme.palette.background.main,
        // alignItems: 'center',
        // justifyContent: 'center',

        maxWidth: '100vw',
        minWidth: '100vw',

        maxHeight: '100vh',
        minHeight: '100vh',
        
        padding: 0,
        margin: 0,
    },
    grid: {
        backgroundColor: 'red',
        margin: 0,

    }
}))

export default coreStyles