import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container } from "@mui/material";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import mypage from "../../../api/mypage";

class question extends Component {

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
                if(comment.answer != null){
                    this.setState({
                        comment:comment.answer
                    })
                }
                else{
                    this.setState({
                        comment:'답변 예정'
                    })
                }
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
                            id="standard-required"
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
                            id="standard-required"
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
                    
                </Grid>
                <br /><br />
                    <Typography variant="h4" style={style} spacing={2}> 답변 </Typography><br />
                    <Grid item md={12}>
                        <TextField
                            required
                            id="standard-required"
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
                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button href="/questionList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default question;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
