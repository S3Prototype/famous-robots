export const autoLogin = async (userData)=>{
    if(!userData.accessToken || !userData.email)
        return

        let result = null
        try{
            result = await fetch('http://localhost:3100/users/login',
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${userData.accessToken}`,
                    'content-type':'application/json'
                },
                body: JSON.stringify({email: userData.email})
            })
            if(result.status === 200){
                return "success"
            }
        } catch(err){
            console.log("Error trying to fetch for autologin:", err)
        }

        return "failure"
}

export const registerUser = async ({name, email, password})=>{
    if(!email)
        throw new Error('Please enter an email.')
    if(!password)
        throw new Error('Please enter a password')        

    let result = null
    try{
        result = await fetch('http://localhost:3100/users/register',
        {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        if(result.status === 200){
            return 'success' 
        }

        const failureMessage = await result.json()
        throw new Error(failureMessage.message)
    } catch(err){
        console.log('Error trying to register:', err)
        throw err
    }
}

export const loginUser = async ({email, password})=>{
    if(!email)
        throw new Error('Please enter an email.')
    if(!password)
        throw new Error('Please enter a password')        

    let result = null
    try{
        result = await fetch('http://localhost:3100/users/login',
        {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(result.status === 200){
            return await result.json() 
        }

        const failureMessage = await result.json()
        throw new Error(failureMessage.message)
    } catch(err){
        console.log('Error trying to manually log in:', err)
        throw err
    }
}