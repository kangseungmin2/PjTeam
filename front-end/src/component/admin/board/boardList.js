import React, { Component } from 'react';
import { Button, Typography } from '@mui/material';
import ApiService from '../../../ApiService';
import { Create, Delete } from '@mui/icons-material'
import { MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';

class BoardList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            message: null
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    // componentDidMount() {
    //     this.reloadBoardList();
    // }

    // list 정보
    // reloadBoardList = () => {
    //     console.log("음?",this.state)
    //     ApiService.fetchBoards()
    //         .then(res => {
    //             this.setState({
    //                 boards: res.data
    //             })
    //         })
    //         .catch(err => {
    //             console.log('reloadBoardList() Error!!', err);
    //         })
    //         console.log(this.state.boards)
    // }

    // insert
    addBoard = () => {
        window.localStorage.removeItem("boardNum");
        this.props.history.push("/boardAdd");
    }

    // update
    // editBoard = (num) => {
    //     window.localStorage.setItem("boardNum", num);
    //     this.props.history.push("/boardEdit")
    // }

    // delete
    // deleteBoard = (num) => {
    //     ApiService.deleteBoard(num)
    //         .then(res => {
    //             this.setState({
    //                 boards: this.state.boards.filter(board => board.num !== num)
    //             });
    //             console.log('delete 성공 : ', res.data);
    //         })
    //         .catch(err => {
    //             console.log('deleteBoard() Error!!', err);
    //         })
    // }

    render() {
        return (
        <div><br /><br />
        <Typography variant="h4" style={style}> Board List </Typography>
        <Button variant="contained" style={btn} color="primary" onClick={this.addBoard}> Add Board </Button>

            <MDBAccordion initialActive={1}>
                {this.state.boards.map(board =>
                        <MDBAccordionItem key={board.num} collapseId={board.num} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; {board.title}</>}>
                            {board.content}<br />
                            <button className="btn" onClick={() => this.editBoard(board.num)}><Create /></button>
                            <button className="btn" onClick={() => this.deleteBoard(board.num)}><Delete /></button>
                        </MDBAccordionItem>
                    )}
            </MDBAccordion>
        </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const btn = {
    display: 'flex',
    justifyContent: 'rignt'
}

export default BoardList;