import React, { Component } from 'react';
import { Button, Typography, Grid, Container, TablePagination } from '@mui/material';
import ApiService from '../../../ApiService';
import { Create, Delete } from '@mui/icons-material'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';

class BoardList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadBoardList();
    }

    // list 정보
    loadBoardList = () => {
        ApiService.fetchBoards()
            .then(res => {
                this.setState({
                    boards: res.data
                })
            })
            .catch(err => {
                console.log('reloadBoardList() Error!!', err);
            })
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
        // 사용자에게 확인 창을 표시
        const confirmDelete = window.confirm("게시물을 삭제하시겠습니까?");

        // 확인이 클릭된 경우만 삭제 진행
        if (confirmDelete) {
            ApiService.deleteBoard(num)
                .then(res => {
                    this.setState({
                        boards: this.state.boards.filter(board => board.num !== num)
                    });
                    console.log('delete 성공 : ', res.data);
                })
                .catch(err => {
                    console.log('deleteBoard() Error!!', err);
                });
        } else {
            // "취소"를 클릭한 경우 삭제를 취소
            console.log('삭제가 취소되었습니다.');
        }
    }
    // page
    handleChangePage = (event, newpage) => {
        this.setState({ page: newpage });
    }

    // rowPage
    handleChangeRowsPerPage = (event) => {
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    }

    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        return (
            <Container component="main" maxWidth="md">

                <ContentPasteOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Board List </Typography>

                <Grid container spacing={2}>

                    <Grid item md={12}>
                        <Button variant="contained" style={btn} color="primary" onClick={this.addBoard}> Add Board </Button>
                        <MDBAccordion initialActive={1}>
                            {this.state.boards.slice(page * rPage, page *
                                rPage + rPage).map(board =>
                                    <MDBAccordionItem key={board.num} collapseId={board.num} headerTitle={<><HelpOutlinedIcon fontSize='medium' color='primary' /><MDBIcon fas icon="question-circle" /> &nbsp; {board.title}</>}>
                                        {board.content}<br />
                                        <button className="btn" onClick={() => this.editBoard(board.num)}><Create /></button>
                                        <button className="btn" onClick={() => this.deleteBoard(board.num)}><Delete /></button>
                                    </MDBAccordionItem>
                                )}
                        </MDBAccordion>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.boards.length}
                            rowsPerPage={rPage}
                            page={page}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
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


export default BoardList;