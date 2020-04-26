import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    root: {
        padding: 15,
        '&.loading': {
            filter: 'blur(4px)'
        }
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            padding: 5
        }
    },
    langs: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            padding: 5,
            margin: 5
        }
    },
    contribs: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            padding: 5,
            margin: 5
        },
        flexWrap: 'wrap'
    },
    lang: {
        padding: 5,
        backgroundColor: '#EEE'
    },
    markdown: {
        padding: 15,
        margin: '15px 0',
        border: '1px solid rgba(0,0,0,0.3)'
    }
}))

export default useStyle
