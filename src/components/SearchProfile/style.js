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
        alignItems: 'center'
    },
    dialogContent: {
        '&.loading': {
            filter: 'blur(4px)'
        },
        maxWidth: 450
    },
    result: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    item: {
        width: '30%'
    }
}))

export default useStyle
