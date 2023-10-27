import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Unix_timestamp(t) {
  const date = new Date(t);
  const year = date.getFullYear();
  const month = "0" + (date.getMonth() + 1);
  const day = "0" + date.getDate();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class autoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autos: [],
      message: null
    };
  }

  componentDidMount() {
    this.loadAutoList();
  }

  loadAutoList = () => {
    API.autoList()
      .then((res) => {
        this.setState({
          autos: res.data,
        });
      })
      .catch((err) => {
        console.log('loadAutoList() Error!!', err);
      });
  }

  autoDetail = (autoNum) => {
    window.localStorage.setItem("AutoNum", autoNum);
    this.props.history.push("/autoDetail");
  }

  render() {
    return (
      <Container component="main" maxWidth="md">
        <CurrencyExchangeIcon fontSize='large' color='primary' />
        <Typography variant="h4" style={style}> 자동이체 목록 </Typography>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={this.state.autos.map((auto) => ({
            title: auto.autoTitle,
            start: Unix_timestamp(auto.autoDate), // 이벤트 날짜를 FullCalendar에서 사용 가능한 형식으로 변환
        }))}
        />

        <br/><br/>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="50">No.</TableCell>
                <TableCell align="center" width="200">이체명</TableCell>
                <TableCell align="center" width="150">금액</TableCell>
                <TableCell align="center" width="100">이체일자</TableCell>
                <TableCell align="center" width="50">상세</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.autos.map((auto) => (
                <TableRow hover key={auto.autoNum}>
                  <TableCell align='center'>{auto.autoNum}</TableCell>
                  <TableCell align='center'>{auto.autoTitle}</TableCell>
                  <TableCell align='center'>{auto.autoAmount}원</TableCell>
                  <TableCell align='center'>{new Date(auto.autoDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    })}</TableCell>
                  <TableCell align='center'>
                    <EditNoteOutlinedIcon fontSize='large' onClick={() => this.autoDetail(auto.autoNum)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default autoList;
