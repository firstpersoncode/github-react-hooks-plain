import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom'

import AppContainer from '.'

enzyme.configure({ adapter: new Adapter() })

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useLocation: jest.fn().mockReturnValue({
        pathname: '/',
        search: '',
        hash: '',
        state: null
    })
}))

describe('AppContainer', () => {
    it('should render AppContainer without crashing', () => {
        const App = () => (
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        )
        const wrapper = shallow(<App />)
        expect(wrapper.exists()).toBe(true)
    })
})
