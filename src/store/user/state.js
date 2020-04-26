/*
    src/store/user/state

    Data structure for User state
*/

export const userState = {
    query: [],
    queryFetch: false,
    queryPage: 0,

    selected: {},
    selectedFetch: false,

    events: [],
    eventsFetch: false,
    eventsPage: 0,

    repos: [],
    reposFetch: false,
    reposPanel: false,
    reposPage: 0,

    followings: [],
    followingsFetch: false,
    followingsPanel: false,
    followingsPage: 0,

    followers: [],
    followersFetch: false,
    followersPanel: false,
    followersPage: 0,

    history: []
}
