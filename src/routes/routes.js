export const pages = {
    signUp: '/sign-up',
    signIn: '/',
    timeline: '/timeline',
    hashtag: '/hashtag/:id',
    userPosts: '/user/'
}

//const API_URL = 'http://localhost:5000';

//Quando for fazer o deploy, mudar para:
 const API_URL = `${process.env.REACT_APP_API_URL}`

export const backendroute = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    deleteLogout: API_URL + '/logout',
    postLink: API_URL + '/timeline',
    getAllPosts: API_URL + '/timeline',
    likes: API_URL + '/like',
    getlikes: API_URL + '/like/',
    getUserById: API_URL + '/timeline/user',
    getAllPostsByUserId: API_URL + '/user/',
    getTrendingHashtags: API_URL + '/trending',
    getHashtagPosts: API_URL + '/hashtag/',
    getDataUserByToken: API_URL + '/sessions',
    getSearchByName: API_URL + '/search/',
    deletePostById: API_URL + '/posts/',
    updatePostById: API_URL + '/posts/'
}
