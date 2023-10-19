import React, { Component } from 'react';
import { Button, Typography, Container, Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

class autoDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autos: [
                {
                    autoNum: 1,
                    autoCompany: "자동이체1",
                    autoDate: "2023-10-09",
                    autoType : "납기일출금",
                    autoAmount: "10000"
                },
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    render() {
        const { page, rPage } = this.state;

        return (
            <Container component="main" maxWidth="md">
                <CurrencyExchangeIcon fontSize='large' color='primary' />

                <Typography variant="h4" style={style}> 이체상세 페이지 </Typography>
                <br/><br/>
                <Grid container spacing={2}>
                    {this.state.autos.slice(page * rPage, page * rPage + rPage).map((auto) => (
                        <Grid item xs={4} key={auto.autoNum}>
                            <Paper elevation={3}>
                                <Typography variant="h6">{auto.autoNum}</Typography>
                                <Typography variant="body1">{auto.autoCompany}</Typography>
                                <Typography variant="body1">{auto.autoDate}</Typography>
                                <Typography variant="body1">{auto.autoType}</Typography>
                                <Typography variant="body1">{auto.autoAmount}</Typography>
                                <div style={btn}>
                                    <Button href="/autoList" variant="contained" color="primary">확인</Button>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <br/><br/>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.autos.length}
                    rowsPerPage={rPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
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
    justifyContent: 'center'
}

export default autoDetail;
