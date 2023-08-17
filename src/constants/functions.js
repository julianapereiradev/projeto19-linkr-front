export function validateUser(user, setUser) {
    if (!user && localStorage.user) {
        return setUser({ ...JSON.parse(localStorage.user) }); //recuperar dados do localStorage
    }
}

export function headersAuth(token) {
    if (!token && localStorage.user) {
        const user = JSON.parse(localStorage.user);
        token = user.token;
    }

    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}