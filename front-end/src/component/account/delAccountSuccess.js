import React, { Component } from "react";
import { Button, IconButton,Table, TableHead, TableBody, TableRow, TableCell, Typography} from "@mui/material";


class delAccountSuccess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            accountNum:'',

        }
    }

    // componentDidMount() {
    //     this.useInsertionEffect();
    // }

    // useInsertionEffect = () => {
    //     let id = window.localStorage.getItem("id");
    //     Account.accountList(id)
    //         .then(res => {
    //             this.setState({
    //                 data: res.data
    //             })
    //         })
    // }

    nextButton = () => {
        this.props.history.push("/allAccount");
    }

    render() {
        return (
            <div align='center'>
                <form>
                    <br />
                    <Typography variant="h4">
                        해지가 완료되었습니다.
                    </Typography>
                    <br /><br />
                    <Table style={{ width: '53vw' }}>
                        <TableHead style={style}  >
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
            
                    </Table>
                    <Table>
                        <TableHead>
                            <TableRow style={style}>
                                <TableCell style={{ border: 'none' }}>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>확인</button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>

                    <br /><br />
                    <br />
                </form>
            </div>
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const button = {
    width: '130px',
    height: '40px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    borderRadius: '10px'
}



export default delAccountSuccess;