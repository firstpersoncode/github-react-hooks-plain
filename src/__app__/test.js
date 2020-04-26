import ReactDOM from 'react-dom'

import { bootstrap } from './client'

describe('test App client', () => {
    const originalRender = ReactDOM.hydrate
    const originalGetElement = global.document.getElementById
    beforeEach(() => {
        global.document.getElementById = () => true
        ReactDOM.hydrate = jest.fn()
    })
    afterAll(() => {
        global.document.getElementById = originalGetElement
        ReactDOM.hydrate = originalRender
    })
    it('should call ReactDOM.hydrate', () => {
        bootstrap()
        expect(ReactDOM.hydrate).toHaveBeenCalled()
    })
})
