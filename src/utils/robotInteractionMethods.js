export const sendVoteToServer = async (robot, userData)=>{

        return await fetch('http://localhost:3100/robots/vote',
        {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${userData.accessToken}`,
                'content-type': 'application/json'
            },
            body: {
                robot,
                username: userData.username //To update the user's "voted" array
            }
        })
}

export const getAllRobots = async (userData)=>{
    return fetch(`/robots/all`,{
        method: `GET`,
        headers: {
            'authorization': `Bearer ${userData.accessToken}`,
            'content-type': `application/json`,
        }
    })
}
