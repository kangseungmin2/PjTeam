import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container } from "@mui/material";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import BoardApi from "../../../api/board";


class BoardEdit extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            title: '',
            content: '',
            message: ''
        }
    }
    componentDidMount() {
        this.loadBoardList();
    }

    // 수정전 상세페이지 호출
    loadBoardList = () =>{
        BoardApi.fetchBoardByNum(window.localStorage.getItem("boardNum"))
            .then(res => {
                let board = res.data;
                this.setState({
                    num: board.num,
                    title: board.title,
                    content: board.content
                })
            })
            .catch(err =>{
                console.log('loadBoardList() Error!!', err);
            });
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editBoard = (e) => {
        // save후 reload 방지
        e.preventDefault();
    
        const confirmEdit = window.confirm("수정하시겠습니까?"); // 수정 여부를 묻는 알림창
    
        if (confirmEdit) {
            let inputData = {
                num: this.state.num,
                title: this.state.title,
                content: this.state.content
            }
    
            BoardApi.editBoard(inputData)
                .then(res => {
                    console.log('editBoard 성공', res.data);
                    this.props.history.push('/boardList');
                })
                .catch(err => {
                    console.log('editBoard 에러', err);
                });
        } else {
            // 취소를 클릭한 경우, 수정 페이지에 그대로 남기
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <ContentPasteOutlinedIcon fontSize='large' color='primary'/>
                <Typography variant="h4" style={style} spacing={2}> Edit Board </Typography><br />

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

                    <Grid item xs={12}>
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
                    <Button color="primary" variant="contained" onClick={this.editBoard}>edit</Button>
                    <Button href="/boardList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default BoardEdit;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
