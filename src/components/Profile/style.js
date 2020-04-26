import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        '&.loading': {
            filter: 'blur(4px)'
        }
    },
    large: {
        width: 100
    }
}))

export default useStyle
