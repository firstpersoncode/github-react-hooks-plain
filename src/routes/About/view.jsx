/*
    src/routes/About/view

    About route view

    Render about page
*/

import React from 'react'
import { Helmet } from 'react-helmet-async'

const About = () => (
    <>
        <Helmet>
            <title>About</title>
            <meta name="title" content="About" />
            <meta name="description" content="GitHub page with user search and repository search, build using React" />
        </Helmet>
        <p>GitHub page with user search and repository search, build using React</p>
        <p>Nasser Maronie: nasser.maronie@gmail.com</p>
        <p>git@github.com:firstpersoncode/github-react-hooks-plain.git</p>
    </>
)

export default About
