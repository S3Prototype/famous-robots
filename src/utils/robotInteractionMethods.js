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

const getAllRobots = async (userData)=>{
    const robotRequest = await fetch(`/robots/all`,{
        method: `GET`,
        headers: {
            'authorization': `Bearer ${userData.accessToken}`,
            'content-type': `application/json`,
        }
    })
}
