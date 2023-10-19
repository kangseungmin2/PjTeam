import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container } from "@mui/material";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import mypage from "../../../api/mypage";
import questionList from "./questionList";

class questionAdd extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            title: '',
            content: '',
            message: '',
            id : window.localStorage.getItem("id")
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveQuestion = (e) => {
        // save후 reload방지
        e.preventDefault();

        let inputData = {
            title: this.state.title,
            content: this.state.content,
            id: this.state.id
        }
        mypage.insertQuestion(inputData)
            .then(res => {
                console.log('insertQuestion 성공', res.data);
                this.props.history.push('/questionList');
            })
            .catch(err => {
                console.log('insertQuestion 에러', err);
            })
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <ContentPasteOutlinedIcon fontSize='large' color='primary'/>
                <Typography variant="h4" style={style} spacing={2}> Add Question </Typography><br />

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
                            placeholder="input question title"
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
                            placeholder="input question content"
                            onChange={this.onChange} /><br />
                    </Grid>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={this.saveQuestion}>save</Button>
                    <Button href="/questionList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default questionAdd;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
