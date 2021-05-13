import React, {createContext} from 'react'

function createDefaultUser(){
    const defaultUser = {
        data: {
            _id: '',
            isAdmin: false,
            email: '',
            votedForIDs: [],
            loggedIn: false,
            refreshToken: '',
            accessToken: '',
        }
    }

    const customUser = {
        data: defaultUser.data,
        initializeUser: function(){
            if(localStorage.getItem('email') && localStorage.getItem('accessToken'))
                this.data = this.getLocalItems()
            else
                this.resetUser()
        },
        getLocalItems: function(){
            let votedArray = []
            if(localStorage.getItem('votedForIDs') != 'undefined'){
                votedArray = JSON.parse(localStorage.getItem('votedForIDs'))
            }

            return {
                email: localStorage.getItem('email'),
                isAdmin: localStorage.getItem('isAdmin') === 'true',
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
                votedForIDs: votedArray,
                loggedIn: localStorage.getItem('accessToken') != null 
            }
        },
        updateUser: function(userData){            
            this.data = userData
            this.setLocalItems(userData)
            console.log("Updating the user and setting local storage")
        },
        resetUser: function(){           
            this.eraseLocalData()
            this.data = defaultUser.data            
        },
        updateVotedForIDs: function(newVotedArray){
            this.data.votedForIDs = newVotedArray || []
            localStorage.setItem('votedForIDs', JSON.stringify(newVotedArray || []))              
        },
        setLocalItems: function(userData){
            localStorage.setItem('email', userData.email)
            localStorage.setItem('isAdmin', userData.isAdmin)
            localStorage.setItem('accessToken', userData.accessToken)
            localStorage.setItem('refreshToken', userData.refreshToken)              
            localStorage.setItem('votedForIDs', JSON.stringify(userData.votedForIDs || []))              
            console.log("Local storage:",{
                email: localStorage.getItem('email'),
                isAdmin: localStorage.getItem('isAdmin') === 'true',
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'), 
            })
        },
        eraseLocalData: function(){
            localStorage.removeItem('email')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken') 
            localStorage.removeItem('votedForIDs')              
        }
    }

    customUser.updateUser = customUser.updateUser.bind(customUser)
    customUser.resetUser = customUser.resetUser.bind(customUser)    
    customUser.initializeUser = customUser.initializeUser.bind(customUser)    
    customUser.updateVotedForIDs = customUser.updateVotedForIDs.bind(customUser)    
    

    customUser.initializeUser()
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