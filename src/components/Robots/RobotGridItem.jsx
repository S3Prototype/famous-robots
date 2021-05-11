import React from 'react'
import {Grid, Button, Card, Typography} from '@material-ui/core'
import RobotCard from './RobotCard'
import RobotButtonSet from './RobotButtonSet'
import ProgressBar from '../Results/ProgressBar'

function RobotGridItem(props) {
    

    let buttonRowItem = <RobotButtonSet updateAddRobotCards={props.updateAddRobotCards} robotID={props.robot.id} pageType={props.pageType} />

    if(props.pageType === 'Results')
        buttonRowItem = <ProgressBar votes={props.robot.votes} />            

    return (
        <RobotCard pseudo={props.pseudo} name={props.robot.name} image={props.robot.image} imgWidth={props.imgWidth}>
            {buttonRowItem} 
        </RobotCard>
    )
}

export default RobotGridItem
