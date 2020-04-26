import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    user: {
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        padding: 15
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        '& > *': {
            padding: 5
        }
    }
}))

export default useStyle
