import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    content: {
        minHeight: '100vh',
        '& a': {
            color: '#c6ceff'
        }
    },
    dialogContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'none',
        '&.open': {
            display: 'flex'
        },
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogContent: {
        '&.loading': {
            filter: 'blur(4px)'
        },
        maxWidth: 450
    }
}))

export default useStyle
