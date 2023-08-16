export const pages = {
    signUp: '/sign-up',
    signIn: '/',
    timeline: '/timeline'
}

const API_URL = 'http://localhost:5000';

//Quando for fazer o deploy, mudar para:
//const API_URL = `${process.env.REACT_APP_API_URL}`

export const backendroute = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    deleteLogout: API_URL + '/logout',
    postLink: API_URL + '/timeline'
}