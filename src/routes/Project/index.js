/*
    src/routes/Home

    Home route

    contain:
        - ProgressiveImage
*/

import Loadable from 'react-loadable'

import { PATH_PROJECT } from '~/variables/urls'
import {
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    SET_PROJECT_CONTRIBUTORS
} from '~/store/project/constant'

const ProjectPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "project" */ './view'),
    loading: () => null
})

const Project = {
    component: ProjectPromise,
    exact: true,
    path: PATH_PROJECT,
    loadData: async ({ state, actions }) => {
        if (!(state.project && state.project.selected && Object.keys(state.project.selected).length)) {
            await actions({ type: SET_PROJECT_SELECTED, payload: 'firstpersoncode/github-react-hooks-plain' })
            await actions({ type: SET_PROJECT_CONTRIBUTORS, payload: 'firstpersoncode/github-react-hooks-plain' })
            await actions({ type: SET_PROJECT_CONTENTS, payload: 'firstpersoncode/github-react-hooks-plain' })
            actions({ type: SET_PROJECT_LANGUAGES, payload: 'firstpersoncode/github-react-hooks-plain' })
        }
    }
}

export default Project
