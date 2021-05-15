import React from 'react'
import RobotCard from './RobotCard'
import RobotButtonSet from './RobotButtonSet'
import ProgressBar from '../Results/ProgressBar'

function RobotGridItem(props) {
    

    let buttonRowItem = 
        <RobotButtonSet
            convertToEditCard={props.convertToEditCard}
            robot={props.robot} pageType={props.pageType}
            alreadyVotedList={props.alreadyVotedList}
            setAlreadyVotedList={props.setAlreadyVotedList}
            setRobotList={props.setRobotList}
        />

    if(props.pageType === 'Results')
        buttonRowItem = <ProgressBar votes={props.robot.votes} />            

    return (            
        <RobotCard pseudo={props.pseudo} name={props.robot.name} image={props.robot.image} imgWidth={props.imgWidth}>
            {buttonRowItem} 
        </RobotCard>
    )
}

export default RobotGridItem
