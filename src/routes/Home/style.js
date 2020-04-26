import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    container: {
        display: 'flex',
        '@media only screen and (max-width: 600px)': {
            display: 'block'
        }
    },
    main: {
        width: '60%',
        padding: 15,
        '@media only screen and (max-width: 600px)': {
            width: '100%'
        }
    },
    side: {
        width: '40%',
        padding: 15,
        '@media only screen and (max-width: 600px)': {
            width: '100%'
        }
    },
    history: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            padding: 5,
            margin: 5
        },
        flexWrap: 'wrap'
    }
}))

export default useStyle
