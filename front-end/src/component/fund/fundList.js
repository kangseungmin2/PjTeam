import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import ApiService from "../../ApiService.js";

class fundList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            fundList:[], 
            message:null
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

    accountChk = () => {
        this.props.history.push("/accountChk");
    }

    render () {
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

                    <TableBody style={style}>
                        {this.state.fundList.map(product=>
                        <TableRow key={product.fpName}>
                                <TableCell component="th" scope='product' style={style2}>{product.fpName}</TableCell>
                                <TableCell style={style2}>{product.fpNum}</TableCell>
                                <TableCell style={style2}>{product.marketPrice}</TableCell>
                                <TableCell style={style2}>{product.closingPrice}</TableCell>
                                <TableCell style={style2}>{product.highPrice}</TableCell>
                                <TableCell style={style2}>{product.lowPrice}</TableCell>
                                <TableCell style={style2}>{product.fluctuationRate}</TableCell>
                          </TableRow>  
                        )}
                            
                    </TableBody>
                    {/* <TableBody style={style}>
                        <TableRow onClick={this.accountChk}>
                                <TableCell style={style2}>ACE 200</TableCell>
                                <TableCell style={style2}>105190</TableCell>
                                <TableCell style={style2}>33300</TableCell>
                                <TableCell style={style2}>33922</TableCell>
                                <TableCell style={style2}>35000</TableCell>
                                <TableCell style={style2}>32900</TableCell>
                                <TableCell style={style2}>0.11%</TableCell>
                          </TableRow>  
                    </TableBody> */}
                </Table>
                </form>
            </div>
        );
    }
}

const style ={
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'


}

const style2 ={
    width : 200,
    height : 'auto'
}
export default fundList;