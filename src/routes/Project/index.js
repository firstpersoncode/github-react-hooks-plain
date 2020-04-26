import Loadable from 'react-loadable'
import { PATH_PROJECT } from '~/variables/urls'

const ProjectPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "project" */ './view'),
    loading: () => null
})

const Project = {
    component: ProjectPromise,
    exact: true,
    path: PATH_PROJECT
}

export default Project
