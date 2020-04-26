import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        '&.loading': {
            filter: 'blur(4px)'
        }
    },

    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& > *': {
            padding: 10
        }
    }
}))

export default useStyle
