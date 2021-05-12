import React, {createContext} from 'react'

function createDefaultUser(){
    const defaultUser = {
        data: {
            _id: '',
            isAdmin: false,
            username: '',
            seen: [],
            loggedIn: false,
            refreshToken: '',
            accessToken: '',
        }
    }

    const customUser = {
        data: defaultUser.data,
        updateUser: (userData)=>{            
            this.data = userData
            this.setLocalItems(userData)
        },
        resetUser: ()=>{           
            this.data = defaultUser.data            
        },
        setLocalItems: function(userData){
            localStorage.setItem('username', userData.username)
            localStorage.setItem('accessToken', userData.accessToken)
            localStorage.setItem('refreshToken', userData.refreshToken)  
            
            console.log("Local storage:", localStorage)
        }
    }

    customUser.updateUser = customUser.updateUser.bind(customUser)
    customUser.resetUser = customUser.resetUser.bind(customUser)

    return customUser
}

export const UserContext = createContext(createDefaultUser())


export function UserContextProvider(props) {
    return (
        <UserContext.Provider value={UserContext}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)