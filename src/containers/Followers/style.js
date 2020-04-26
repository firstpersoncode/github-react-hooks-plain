import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        padding: 15,
        '&.loading': {
            filter: 'blur(4px)'
        },
        boxShadow: '0 0 3px 1px rgba(0,0,0,0.2)',
        marginBottom: 15
    },
    header: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& > *': {
            padding: 10
        }
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& > *': {
            padding: 10
        }
    },
    list: {
        listStyle: 'none'
    }
}))

export default useStyle
