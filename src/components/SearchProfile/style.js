import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(() => ({
    result: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '&.loading': {
            filter: 'blur(4px)'
        }
    },
    item: {
        width: '25%',
        padding: 15
    },
    itemList: {
        alignItems: 'center',
        display: 'flex',
        '& > *': {
            padding: 5
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
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        padding: 15,
        flex: 1,
        '&.button': {
            flex: 0
        },
        border: '1px solid rgba(0,0,0,0.3)'
    }
}))

export default useStyle
