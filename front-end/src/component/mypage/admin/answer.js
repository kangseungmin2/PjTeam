import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container } from "@mui/material";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import mypage from "../../../api/mypage";

class answer extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            num: '',
            title: '',
            content: '',
            id: '',
            answer: '',
            comment: ''


        }
    }

    componentDidMount() {
        this.answer();
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    answerSave = (e) => {
        e.preventDefault();
        let inputData = {
            answer: this.state.answer,
            questionNum: window.localStorage.getItem("num"),
            id: window.localStorage.getItem("admin")
        }
        mypage.insertAnswer(inputData)
        .then(
            window.location.reload()
        )
    }

    answer = () => {
        mypage.fetchAnswer(window.localStorage.getItem("num"))
            .then(res => {
                let answer = res.data;
                this.setState({
                    num: answer.num,
                    title: answer.title,
                    content: answer.content,
                    id: answer.id
                })
            })
            .catch(err => {
                console.log('answer() Error !', err);
            });
        mypage.commentConfirm(window.localStorage.getItem("num"))
            .then(res => {
                let comment = res.data;
                this.setState({
                    comment:comment.answer
                })
            console.log("comment",comment.answer)
            })

    }


    render() {
        return (
            <Container component="main" maxWidth="md">

                <ContentPasteOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> 문의내용 </Typography><br />

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
                            disabled
                        /><br />
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
                            disabled
                        /><br />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            required
                            id="sandard-required"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={10}
                            label="comment"
                            // helperText="please enter content"
                            type="text"
                            name="comment"
                            value={this.state.comment}
                            placeholder="input question content"
                            disabled
                        /><br />
                    </Grid>
                </Grid>
                <br /><br />
                <Typography variant="h4" style={style} spacing={2}> 답변 </Typography><br />
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <TextField
                            required
                            id="sandard-required"
                            variant="outlined"
                            label="answer"
                            fullWidth
                            // helperText="please enter title"
                            type="text"
                            name="answer"
                            value={this.state.answer}
                            placeholder="input answer content"
                            onChange={this.onChange}
                        /><br />
                    </Grid>

                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={this.answerSave}>save</Button>
                    <Button href="/answerList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default answer;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
