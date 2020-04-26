/*
    src/routes/About

    About route
*/

import Loadable from 'react-loadable'

import { PATH_ABOUT } from '~/variables/urls'

const AboutPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "about" */ './view'),
    loading: () => null
})

const About = {
    component: AboutPromise,
    path: PATH_ABOUT
}

export default About
