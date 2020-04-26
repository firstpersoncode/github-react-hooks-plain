import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '&.loading': {
            filter: 'blur(4px)'
        },
        marginBottom: 30,

        '@media only screen and (max-width: 600px)': {
            display: 'block'
        }
    },
    large: {
        width: 300
    },
    info: {
        padding: 15
    }
}))

export default useStyle
