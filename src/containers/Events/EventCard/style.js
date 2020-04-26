import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    card: {
        padding: 15,
        boxShadow: '0 0 3px 1px rgba(0,0,0,0.2)',
        marginBottom: 15
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center'
    },
    payload: {
        maxHeight: 200,
        maxWidth: 600,
        overflow: 'auto',
        display: 'none',
        '&.open': {
            display: 'block'
        },
        backgroundColor: '#EEE'
    }
}))

export default useStyle
