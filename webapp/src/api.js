
/**
 * Interact with the REST API
 * 
 * @param {String} endpoint The API endpoint to call (ex: auth/login)
 * @param {Object} data Data to submit besides the token
 * @return {Object} The data
 */
async function request(endpoint, data = {}) {
    var res = await fetch(`/api/v1/${endpoint}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: localStorage.getItem("token"), ...data})
    })
    return await res.json()
}

function admin() {
    var ad = localStorage.getItem("admin")
    if (typeof ad == "boolean")
        return ad
    else
        return localStorage.getItem("admin") == "true"
}

export default {
    fetch: request,
    admin
}