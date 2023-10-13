import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container } from "@mui/material";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ApiService from '../../../ApiService';
import Question from "../member/question.js";

class answer extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            title: '',
            content: '',
            message: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    render() {
        return (
            <Container component="main" maxWidth="md">

                <ContentPasteOutlinedIcon fontSize='large' color='primary'/>
                <Typography variant="h4" style={style} spacing={2}>1:1 문의</Typography><br />

                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <TextField
                            required
                            id="sandard-required"
                            variant="outlined"
                            label="title"
                            fullWidth
                            // helperText="please enter title"
                            type="text"
                            name="title"
                            value={this.state.title}
                            placeholder="input Board title"
                            onChange={this.onChange} /><br />
                    </Grid>

                    <Grid item md={12}>
                        <TextField
                            required
                            id="sandard-required"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={10}
                            label="content"
                            // helperText="please enter content"
                            type="text"
                            name="content"
                            value={this.state.content}
                            placeholder="input Board content"
                            onChange={this.onChange} /><br />
                    </Grid>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.saveBoard}>save</Button>
                    <Button href="/boardList" variant="contained" color="primary">back</Button>
                </Stack>
                {<Question />} <br/><br/>  
            </Container>
        );
    }
}
export default answer;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
