import React, { Component } from "react";
import { TextField, Typography, Button, TableHead, TableBody } from "@mui/material";
import ApiService from '../../../ApiService';


class BoardAdd extends Component{

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state={
            title: '',
            content: '',
            message: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveBoard = (e) => {
        // save후 reload방지
        e.preventDefault();

        let inputData = {
            title: this.state.title,
            content: this.state.content
        }
        ApiService.addBoard(inputData)
            .then(res => {
                console.log('BoardAdd 성공', res.data);
                this.props.history.push('/boardList');
            })
            .catch(err => {
                console.log('BoardAdd 에러', err);
            })
    }

    render(){
        return(
            <div align="center"><br/><br/>
                <Typography variant="h4" style={style}> Add Board </Typography><br/>
               
                    <Typography variant="h5"> Title 

                    <TextField 
                        required
                        id="sandard-required"
                        variant="outlined"
                        label="title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="input Board title"
                        onChange={this.onChange} /></Typography><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="outlined"
                        multiline
                        rows={7}
                        label="content"
                        type="text"
                        name="content"
                        value={this.state.content}
                        placeholder="input Board content"
                        onChange={this.onChange} /><br/>
                    
                    <Button variant="contained" color="primary" onClick={this.saveBoard}>save</Button>
                    <Button href="/boardList" variant="contained" color="primary">back</Button>
            </div>
        );
    }
}
export default BoardAdd;

const style ={
    display: 'flex',
    justifyContent: 'center'
}
