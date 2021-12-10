export const autoLogin = async (userData)=>{
        try{
            
            if(!userData.accessToken || !userData.email)
                throw new Error('Please log in')
            
            let result = null
            
            result = await fetch('https://famous-robots-backend.onrender.com/users/login',
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${userData.accessToken}`,
                    'content-type':'application/json'
                },
                body: JSON.stringify({email: userData.email})
            })

            const status = result.status
            const resultJSON = await result.json()

            if(status === 200){
                return resultJSON
            }

            throw new Error(resultJSON.message)
        } catch(err){
            throw err
        }
}

export const registerUser = async ({name, email, password})=>{
    if(!email)
        throw new Error('Please enter an email.')
    if(!password)
        throw new Error('Please enter a password')        

    let result = null
    try{
        result = await fetch('https://famous-robots-backend.onrender.com/users/register',
        {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        
        const resultJSON = await result.json() 

        if(result.status === 200){
            return resultJSON
        }
        
        throw new Error(resultJSON.message)
    } catch(err){
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
        result = await fetch('https://famous-robots-backend.onrender.com/users/login',
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
        throw err
    }
}