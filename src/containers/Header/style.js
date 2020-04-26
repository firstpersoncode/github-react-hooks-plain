import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#000',
        boxShadow: '0 0 10px 10px rgba(0,0,0,0.3)',
        width: '100%',
        zIndex: 1000,
        position: 'sticky',
        top: 0,
        minHeight: 50
    },
    nav: {
        display: 'flex',
        justifyContent: 'flext-end',
        alignItems: 'center'
    }
}))

export default useStyle
