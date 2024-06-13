const backendDomain = "http://localhost:8085"

const SummaryApi = {
    signUP: {
        url:`${backendDomain}/api/signup`,
        method: 'POST'
    },
    signIn: {
        url:`${backendDomain}/api/signin`,
        method: 'POST'
    },
    current_user: {
        url:`${backendDomain}/api/user-detail`,
        method: 'GET'
    },
    logout: {
        url:`${backendDomain}/api/logout`,
        method: 'GET'
    },
    alluser: {
        url:`${backendDomain}/api/all-user`,
        method: 'GET'
    }
}


export default SummaryApi;