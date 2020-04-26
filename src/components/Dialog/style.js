import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
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
        alignItems: 'center',
        zIndex: 20000
    },
    dialogContent: {
        '&.loading': {
            filter: 'blur(4px)'
        },
        maxWidth: 850,

        backgroundColor: '#FFF',
        boxShadow: '0 0 5px 3px rgba(0,0,0,0.2)'
    },
    dialogChild: {
        padding: 15,
        maxHeight: '80vh',
        overflow: 'auto'
    },
    close: {
        padding: 15,
        textAlign: 'right'
    }
}))

export default useStyle
