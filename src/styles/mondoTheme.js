import { createMuiTheme } from '@material-ui/core/styles'

const mondoTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#414242',
            main: '#414242',
            dark: '#737475',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            main: '#F4F6F8'
        },
        white: {
            main: '#FFFFFF'
        },
    },
    typography: {
        fontFamily: ["Helvetica Regular", "Helvetica Bold"].join(','),
        color: '#414242',
    },
})

export default mondoTheme