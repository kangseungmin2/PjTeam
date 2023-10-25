import { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TablePagination, TableFooter, TableContainer, Paper } from "@mui/material";
import { InputAdornment, Input, IconButton, Grid, Button, FormHelperText, FormControl, MenuItem, Select } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import exApi from "../../api/exchange";
import LoanSignApi from "../../api/loanSign";
import '../fund/fund.css';
import './exchange.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default class exchangeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exchangeList: [],
            checked: false,
            nation: '',
            price: 0,        //환율
            tPrice: 0,       //입력한값
            rPrice: 0,       //출력된값
            limit: 5,
            page: 0,
            rPage: 10,
            accountNumList: [],     // 계좌 리스트 받는 배열,
            accountNum: '',
            isSticky: false,
            checked: false,
            showPassword: false,
            accountPW: '',
            accountPWD: '',
            isButtonDisabled: true

        }
    }

    handleClickShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }
    // 비밀번호
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }


    componentDidMount() {
        this.exchangeList();
        this.loadAccountNum();  // 전체 계좌번호 조회
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    pwCheck = (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem("id")
        let inputData = {
            accountNum: this.state.accountNum,
            id: id
        }

        LoanSignApi.pwCheck(inputData)
            .then((res) => {
                const accountPwD = res.data;
                this.setState({ accountPWD: accountPwD });

                if (this.state.accountPW == this.state.accountPWD) {
                    // 비밀번호가 일치하는 경우 알림 창 표시
                    this.setState({ isButtonDisabled: false });
                    window.alert('비밀번호가 일치. 계속 진행하세요.');
                }
                else {
                    // 비밀번호가 불일치
                    window.alert('비밀번호가 불일치. 확인하세요.');
                }
            })
            .catch(err => {
                console.log('pwCheck 에러', err);
            })
    }
    chkChange = (e) => {
        this.setState({ checked: e.target.checked })
    }
    handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 120) {
            this.setState({ isSticky: true });
        } else {
            this.setState({ isSticky: false });
        }
    }

    loadAccountNum = () => {
        const id = window.localStorage.getItem("id")
        LoanSignApi.fetchAllAccounts(id)
            .then((res) => {
                const accounts = res.data;
                this.setState({ accountNumList: accounts });
            })
            .catch((err) => {
                console.log('계좌 목록 로딩 중 오류 발생:', err);
            });
    }
    exchangeList = () => {
        exApi.exchangList()
            .then(res => {
                this.setState({
                    exchangeList: res.data
                })
                console.log('exchangList', res.data);
            })
            .catch(err => {
                console.log('exchangList 오류', err)
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePrice = (e, tPrice) => {
        // e.target.value를 parseFloat로 변환하여 숫자로 처리
        const newTPrice = parseFloat(e.target.value);

        // tPrice와 this.state.price를 parseFloat로 변환하여 숫자로 처리
        const newRPrice = parseFloat(newTPrice) / parseFloat(this.state.price);
        console.log('newTPrice', newTPrice)
        console.log('newRPrice', newRPrice)
        console.log('price', this.state.price)
        // setState에 객체를 전달하여 상태를 업데이트하고, setState 콜백을 사용
        this.setState(
            {
                tPrice: newTPrice,
                rPrice: newRPrice
            },
            () => {
                // setState 콜백에서 원하는 작업 수행
                console.log('tPrice', this.state.tPrice);
                console.log('rPrice', this.state.rPrice);
            }
        );
    }
    nation = (nation, price) => {
        console.log('여기', nation)
        this.setState({
            nation: nation,
            tPrice: price,
            price: price,
            rPrice: 1
        })
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

    //Insert
    changeInsert = () => {
        if (this.state.checked) {
            console.log('여기!tPrice', Math.round(parseFloat(this.state.tPrice) * 100) / 100)
            console.log('여기!rPrice', Math.round(parseFloat(this.state.rPrice) * 100) / 100);


            let tPrice = Math.round(parseFloat(this.state.tPrice) * 100) / 100;
            let rPrice = Math.round(parseFloat(this.state.rPrice) * 100) / 100;
            let inputData = {
                nation: this.state.nation,
                id: window.localStorage.getItem('id'),
                accountNum: this.state.accountNum,
                tprice: Number(tPrice),       //입력한값
                rprice: Number(rPrice),       //출력된값
            }
            console.log('inputData.tPrice', inputData.tprice)
            console.log('inputData.rPrice', inputData.rprice);

            exApi.exchangeInsert(inputData)
                .then((res) => {
                    console.log('환율', res.data)
                    if (res.data.success) {
                        alert(res.data.message)
                        this.props.history.push("/myExchange");
                    }
                    else {
                        alert(res.data.message)
                    }
                })
        }
        else {
            alert("약관에 동의하세요.")
        }

    }
    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return (
            <div align="center">
                <div style={{ display: 'inline-flex', padding: '30px' }}>

                    <TableContainer component={Paper} sx={{ minWidth: 500, maxWidth: 500 }}>
                        <Typography variant="h4" style={typography}>
                            exchangeList
                        </Typography>

                        <Table>
                            <TableHead style={styledTableHead}>
                                <TableRow>
                                    <TableCell style={styledTableCell}>나라</TableCell>
                                    <TableCell style={styledTableCell}>환율</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.state.exchangeList.slice(page * rPage, page *
                                    rPage + rPage).map((exchange) => (
                                        <TableRow key={exchange.exchangeNum}>
                                            <TableCell style={styledTableCell} onClick={() => this.nation(exchange.nation, exchange.price)}>{exchange.nation}</TableCell>
                                            <TableCell style={styledTableCell}>{exchange.price}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableCell colSpan={7}>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 30, 60]}
                                        component="div"
                                        count={this.state.exchangeList.length}
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
                <div className={`sticky-element ${this.state.isSticky ? 'sticky' : ''}`} >
                    <div style={{ display: 'block' }}>
                        <div className="form-outline mb-4" style={{ textAlign: "end" }}>
                            <label className="form-label" htmlFor="cnt">대한민국</label>
                            <input type="number" id="cnt" name="tPrice" className="form-control" onChange={(e) => this.onChangePrice(e, this.state.tPrice)} value={this.state.tPrice} />
                        </div>

                        <div className="form-outline mb-4" style={{ textAlign: "end" }}>
                            <label className="form-label" htmlFor="price">현재 국가: {this.state.nation}</label>
                            <input type="number" id="price" name="rPrice" className="form-control" value={Math.round(parseFloat(this.state.rPrice) * 1000) / 1000} />
                        </div>
                        <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                            <Select
                                labelId="accountNum-label"
                                id="accountNumInput"
                                name="accountNum"
                                value={this.state.accountNum}
                                onChange={this.onChange}
                            >
                                {this.state.accountNumList.map((account) => (
                                    <MenuItem key={account.accountNum} value={account.accountNum}>
                                        {account.accountNum}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>환율 신청 계좌번호</FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                            <Input
                                id="accountPWInput"
                                type={this.state.showPassword ? "text" : "password"}
                                name="accountPW"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={this.onChange}
                            />
                            <FormHelperText >비밀번호</FormHelperText>
                        </FormControl>
                        <br />
                        <Grid container spacing={2}>
                            <Button style={{ margin: '0 auto' }} color="primary" variant="outlined" onClick={this.pwCheck}>계좌확인</Button>
                        </Grid>
                        <div>
                            <span style={{ color: "red", fontSize: '13px' }}>※ 필수</span> <span style={{ color: "red", fontSize: '13px' }}>모든 이용약관을 확인 하였으며, 이의 동의합니다.</span>
                            <Checkbox
                                {...label}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                checked={this.state.checked}
                                onChange={this.chkChange}
                            />
                        </div>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Button style={{ margin: '0 auto' }} color="primary" variant="outlined" onClick={this.changeInsert} disabled={this.state.isButtonDisabled} >환전 신청</Button>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}
const typography = {
    textAlign: 'center',
    fontSize: '30px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1'
}
const styledTableCell = {
    color: 'black',
    fontSize: '15px',
    textAlign: 'center'
}

const styledTableHead = {
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
}
