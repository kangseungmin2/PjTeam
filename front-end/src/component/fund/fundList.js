import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography,TablePagination, TableFooter } from "@mui/material";
import ApiService from "../../ApiService.js";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';


class fundList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            fundList:[], 
            message:null,
            page: 0,
            rPage: 5
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
            <div><br/><br/>
               <form> 
                <Typography variant="h4">
                     Fund List
                </Typography>
                <Table>
                    <TableHead style={style}>
                        <TableRow>
                            <TableCell style={style2}>종목명</TableCell>
                            <TableCell style={style2}>종목코드</TableCell>
                            <TableCell style={style2}>시가</TableCell>
                            <TableCell style={style2}>종가</TableCell>
                            <TableCell style={style2}>고가</TableCell>
                            <TableCell style={style2}>저가</TableCell>
                            <TableCell style={style2}>등락율</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.fundList.slice(page * rPage, page * 
                            rPage + rPage).map((product) => (
                        <TableRow hover key={product.fpName} onClick={this.accountChk.bind(this,product.fpName)}>
                                <TableCell component="th" scope='product' style={style2}>{product.fpName}</TableCell>
                                <TableCell style={style2}>{product.fpNum}</TableCell>
                                <TableCell style={style2}>{product.marketPrice}</TableCell>
                                <TableCell style={style2}>{product.closingPrice}</TableCell>
                                <TableCell style={style2}>{product.highPrice}</TableCell>
                                <TableCell style={style2}>{product.lowPrice}</TableCell>
                                <TableCell style={style2}>{product.fluctuationRate}</TableCell>
                          </TableRow>  
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={7}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
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
                </form>
            </div>
        );
    }
}

const style ={
    justifyContent : 'center',
    alignItems : 'center'


}

const style2 ={
    width : 200,
    height : 'auto'
}
export default fundList;