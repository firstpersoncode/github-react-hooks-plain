import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        backgroundColor: '#FFF',
        boxShadow: '0 0 10px 5px rgba(0,0,0,0.3)',

        zIndex: 1000,
        position: 'sticky',
        top: 0,
        minHeight: 50,
        padding: 15
    },
    nav: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& > *': {
            padding: 10
        }
    }
}))

export default useStyle
