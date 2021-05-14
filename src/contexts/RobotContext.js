import React, {createContext} from 'react'

function createDefaultRobotSet(){

    const robotSet = {
        updateNeeded: true,
        robots: [],
        initializeRobotSet: function(){
            this.robots = JSON.parse(localStorage.getItem('mondoRobots'))
                //If we got nothing from local storage, reset robots.
            this.robots || this.resetRobotSet()
        },
        updateRobots: function(robots){            
            this.robots = robots
            localStorage.setItem('mondoRobots', JSON.stringify(robots))
            this.updateNeeded = false       
        },
        resetRobotSet: function(){    
            localStorage.removeItem('mondoRobots')              
            this.robots = [] 
            this.updateNeeded = true           
        },
    }

    robotSet.updateRobots = robotSet.updateRobots.bind(robotSet)
    robotSet.resetRobotSet = robotSet.resetRobotSet.bind(robotSet)    
    robotSet.initializeRobotSet = robotSet.initializeRobotSet.bind(robotSet)    

    robotSet.initializeRobotSet()
    return robotSet
}

export const RobotContext = createContext(createDefaultRobotSet())


export function RobotContextProvider(props) {
    return (
        <RobotContext.Provider value={RobotContext}>
            {props.children}
        </RobotContext.Provider>
    )
}

export const useRobotContext = () => React.useContext(RobotContext)