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
        justifyContent: 'flex-end'
    }
}))

export default useStyle
