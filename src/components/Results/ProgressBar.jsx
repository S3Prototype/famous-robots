import { Box, Typography } from '@material-ui/core'
import React from 'react'

function ProgressBar(props) {
    return (
        <div style={{
                display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
                rowGap: 9, minHeight:100, minWidth:'90%', maxWidth:'90%',
            }}>            
            <div style={{display:'flex', alignItems:'flex-end'}}>
                <Typography style={{fontFamily:'Helvetica Bold', lineHeight:1}} variant='h3'>11</Typography>
                <Typography style={{fontFamily:'Helvetica Bold'}} variant='h5'>/55</Typography>
            </div>
            <div style={{
                width:'100%',
                height:34,
                borderRadius: 8,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#D8DADB',
                padding:2,
                direction:"column",
                display:'flex',
                alignItems: 'center',          
                // justifyContent:'center'
            }}>
                {/* <div style={{
                        height:'100%',
                        minWidth:'100%', maxWidth:'100%',
                        display: 'flex', alignItems:'center',
                        // borderRadius: 5,
                    }}> */}
                    <div
                        style={{
                                //Should be props.votes/55*100
                            width: `${22/55*100}%`,
                            height:'100%',
                            backgroundColor: '#414242',
                            borderRadius: 5,
                    }}
                    >
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
