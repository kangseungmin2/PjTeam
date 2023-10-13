import React, { Component } from 'react';
import { Button, Typography, Grid, Container} from '@mui/material';
import ApiService from '../../../ApiService';
import { Create, Delete } from '@mui/icons-material'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';
import AnswerList from "../admin/answerList.js";

class questionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boards: [
                { num: 1, title: "첫번째", content: "게시글" },
                { num: 2, title: "두번째", content: "게시글" }
            ],
            message: null
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadBoardList();
    }

    // list 정보
    loadBoardList = () => {
        console.log("음?",this.state)
        ApiService.fetchBoards()
            .then(res => {
                this.setState({
                    boards: res.data
                })
            })
            .catch(err => {
                console.log('reloadBoardList() Error!!', err);
            })
            console.log(this.state.boards)
    }

    // insert
    addBoard = () => {
        window.localStorage.removeItem("boardNum");
        this.props.history.push("/boardAdd");
    }

    // update
    editBoard = (num) => {
        window.localStorage.setItem("boardNum", num);
        this.props.history.push("/boardEdit")
    }

    // delete
    deleteBoard = (num) => {
        ApiService.deleteBoard(num)
            .then(res => {
                this.setState({
                    boards: this.state.boards.filter(board => board.num !== num)
                });
                console.log('delete 성공 : ', res.data);
            })
            .catch(err => {
                console.log('deleteBoard() Error!!', err);
            })
    }

    render() {
        return (

            <Container component="main" maxWidth="md">
                
                <ContentPasteOutlinedIcon fontSize='large' color='primary'/>
                <Typography variant="h4" style={style}> 1:1 문의 </Typography>
                
                <Grid container spacing={2}>
                    
                    <Grid item md={12}>
                    <Button variant="contained" style={btn} color="primary" onClick={this.addBoard}> Add Board </Button>
                        <MDBAccordion initialActive={1}>
                            {this.state.boards.map(board =>
                                <MDBAccordionItem key={board.num} collapseId={board.num} headerTitle={<><HelpOutlinedIcon fontSize='medium' color='primary'/><MDBIcon fas icon="question-circle" /> &nbsp; {board.title}</>}>
                                {board.content}<br />
                                    <button className="btn" onClick={() => this.editBoard(board.num)}><Create /></button>
                                    <button className="btn" onClick={() => this.deleteBoard(board.num)}><Delete /></button>
                                </MDBAccordionItem>
                            )}
                        </MDBAccordion>
                        <br/><br/>  
                        
                    </Grid>
                </Grid>
            </Container>

        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const btn = {
    display: 'flex',
    justifyContent: 'left'
}


export default questionList;