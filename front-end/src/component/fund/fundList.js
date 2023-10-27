import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography,TablePagination, TableFooter, TableContainer, Paper } from "@mui/material";
import ApiService from "../../ApiService.js";


class fundList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            fundList:[], 
            message:null,
            page: 0,
            rPage: 10
        }
    } 

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount(){
        this.fundListSelect();
     }

     // list 정보
     fundListSelect = () =>{
        
        ApiService.fundList()
        .then(res => {
            this.setState({
                fundList : res.data
            })
            console.log('fundList-Data----', res.data); 
        })
        .catch(err =>{
            console.log('fundListSelect() Error!!', err);   
        })
    }
 
    accountChk(fpName){
        window.localStorage.removeItem("fpName");
        window.localStorage.setItem("fpName",fpName);
        this.props.history.push("/accountChk");
    }

    // page
    handleChangePage = (event,newpage) => { 
        this.setState({ page: newpage });
    } 
   
    // rowPage
    handleChangeRowsPerPage = (event) => { 
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    } 

    render () {
        const { page } = this.state;
        const { rPage } = this.state;
        return (
            <div align='center' >
            <TableContainer component={Paper} sx={{ minWidth: 700, maxWidth: 1200}}>
                <Typography variant="h4" style={typography}>
                    Fund List
                </Typography>
                <Table>
                    <TableHead style={styledTableHead}>
                        <TableRow>
                            <TableCell style={styledTableCell}>종목명</TableCell>
                            <TableCell style={styledTableCell}>종목코드</TableCell>
                            <TableCell style={styledTableCell}>시가</TableCell>
                            <TableCell style={styledTableCell}>종가</TableCell>
                            <TableCell style={styledTableCell}>고가</TableCell>
                            <TableCell style={styledTableCell}>저가</TableCell>
                            <TableCell style={styledTableCell}>등락율</TableCell>
                            <TableCell style={styledTableCell}>날짜</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.fundList.slice(page * rPage, page * 
                            rPage + rPage).map((product) => (
                        <TableRow hover key={product.fpName} onClick={this.accountChk.bind(this,product.fpName)}>
                                <TableCell component="th" scope='product' style={styledTableCell}>{product.fpName}</TableCell>
                                <TableCell style={styledTableCell}>{product.fpNum}</TableCell>
                                <TableCell style={styledTableCell}>{product.marketPrice}</TableCell>
                                <TableCell style={styledTableCell}>{product.closingPrice}</TableCell>
                                <TableCell style={styledTableCell}>{product.highPrice}</TableCell>
                                <TableCell style={styledTableCell}>{product.lowPrice}</TableCell>
                                <TableCell style={product.fluctuationRate < 0 ? blueColor : redColor}>{product.fluctuationRate}</TableCell>
                                <TableCell style={styledTableCell}>{new Date(product.eventDate).toLocaleDateString(
                                                                    'ko-KR', {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit'
                                })}</TableCell>
                          </TableRow>  
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={8}>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                component="div"
                                count={this.state.fundList.length}
                                rowsPerPage={rPage}
                                page={page}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            /> 
                        </TableCell>
                    </TableFooter>
                    
                </Table>
                </TableContainer>
            </div>
        );
    }
}

const typography = {
    textAlign : 'center',
    fontSize : '30px',
    margin : '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1'
}
const styledTableCell = {
    color: 'black',
    fontSize: '15px',
    textAlign :'center'
}

const redColor = {
    color: 'red',
    fontSize: '15px',
    textAlign :'center'
}

const blueColor = {
    color: 'blue',
    fontSize: '15px',
    textAlign :'center'
}

const styledTableHead = {
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
}
export default fundList;