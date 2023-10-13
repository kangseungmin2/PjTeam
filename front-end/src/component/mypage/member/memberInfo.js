import React, { Component } from "react";
import {Typography, Container} from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

class memberInfo extends Component{
    render(){
        return(
            <Container maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 내정보 </Typography>
                
            </Container>
        );
    }
    
}
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default memberInfo;