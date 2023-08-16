export function validateUser(user, setUser) {
    if (!user && localStorage.user) {
        return setUser({ ...JSON.parse(localStorage.user) }); //recuperar dados do localStorage
    }
}