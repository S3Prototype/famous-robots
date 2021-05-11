import voltronImage from '../images/Robots/voltron.png'

const robotList = [
    {
        id: 0,
        name: 'Voltron',
        image: 'https://res.cloudinary.com/diujqlncs/image/upload/v1620754595/famousrobots/voltron_yditxm.png',
        votes: 11,
    },
    {
        id: 1,
        name: 'Rosie',
        image: 'https://res.cloudinary.com/diujqlncs/image/upload/v1620754595/famousrobots/rosie_rchg4m.png',
        votes: 11,
    },
    {
        id: 2,
        name: 'Bender',
        image: 'https://res.cloudinary.com/diujqlncs/image/upload/v1620754595/famousrobots/bender_up10pc.png',
        votes: 11,
    },
    {
        id: 3,
        name: 'Megazord',
        image: 'https://res.cloudinary.com/diujqlncs/image/upload/v1620754595/famousrobots/megazord_une027.png',
        votes: 11,
    },
    {
        id: 4,
        name: 'Wall-E',
        image: 'https://res.cloudinary.com/diujqlncs/image/upload/v1620754595/famousrobots/walle_oc7bls.png',
        votes: 11,
    },
]

export const voteForRobotByID = (id)=>{
    robotList.find(robot=>robot.id===id)
    .votes +=1
}

export default robotList