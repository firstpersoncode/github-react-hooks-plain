import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

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
        const wrapper = shallow(<AppContainer />)
        expect(wrapper.exists()).toBe(true)
    })
})
