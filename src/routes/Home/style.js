import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    container: {
        display: 'flex',
        '@media only screen and (max-width: 600px)': {
            display: 'block'
        }
    },
    main: {
        width: '70%',
        padding: 15,
        '@media only screen and (max-width: 600px)': {
            width: '100%'
        }
    },
    side: {
        width: '30%',
        padding: 15,
        '@media only screen and (max-width: 600px)': {
            width: '100%'
        }
    }
}))

export default useStyle
