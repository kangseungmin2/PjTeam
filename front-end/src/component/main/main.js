import React, { Component } from 'react';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import iu from '../../mainResource/iu.png';
import house from '../../mainResource/house.png';
import internet from '../../mainResource/internet.png';
import mydata_0 from '../../mainResource/mydata_0.png';
import won from '../../mainResource/won.png';
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SavingsIcon from '@mui/icons-material/Savings';
import MoneyIcon from '@mui/icons-material/Money';

export default class main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 마우스 호버 여부를 저장하는 상태
            isHovered: {
                icon1: false,
                icon2: false,
                icon3: false,
                icon4: false,
                icon5: false,
                icon6: false
            }
        };
    }

    // 마우스 올렸을 때
    handleMouseEnter = (iconName) => {
        this.setState((prevState) => ({
            isHovered: {
                ...prevState.isHovered,
                [iconName]: true,
            }
        }));
    }

    // 마우스 내렸을 때
    handleMouseLeave = (iconName) => {
        this.setState((prevState) => ({
            isHovered: {
                ...prevState.isHovered,
                [iconName]: false,
            }
        }));
    }

    logout = () => {
        window.localStorage.removeItem('id');
        window.location.reload();
    }
    render() {
        const icon = {
            icon1: {
                fontSize: this.state.isHovered.icon1 ? '70px' : '60px',
                color: this.state.isHovered.icon1 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon1 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            },
            icon2: {
                fontSize: this.state.isHovered.icon2 ? '80px' : '60px',
                color: this.state.isHovered.icon2 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon2 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            },
            icon3: {
                fontSize: this.state.isHovered.icon3 ? '80px' : '60px',
                color: this.state.isHovered.icon3 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon3 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            },
            icon4: {
                fontSize: this.state.isHovered.icon4 ? '80px' : '60px',
                color: this.state.isHovered.icon4 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon4 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            },
            icon5: {
                fontSize: this.state.isHovered.icon5 ? '80px' : '60px',
                color: this.state.isHovered.icon5 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon5 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            },
            icon6: {
                fontSize: this.state.isHovered.icon6 ? '80px' : '60px',
                color: this.state.isHovered.icon6 ? 'white' : '#0074D9',
                background: this.state.isHovered.icon6 ? '#00A8E8' : 'white',
                borderRadius: '100px',
                transition: 'fontSize 1.0s, color 0.3s' // 배경색 및 텍스트 색상에 대한 전환 설정}
            }
        }


        return (
            <div align='center'>
                <MDBCarousel showControls showIndicators>
                    <MDBCarouselItem
                        itemId={1}
                        src={iu}
                        alt='...'
                        style={imgStyle}
                    >
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        itemId={2}
                        src={house}
                        alt='...'
                        style={imgStyle}
                    >
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        itemId={3}
                        src={internet}
                        alt='...'
                        style={imgStyle}
                    >
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        itemId={4}
                        src={mydata_0}
                        alt='...'
                        style={imgStyle}
                    >
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        itemId={5}
                        src={won}
                        alt='...'
                        style={imgStyle}
                    >
                    </MDBCarouselItem>
                </MDBCarousel>

                <div style={middleLine}>
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow >
                                <TableCell
                                    style={cellStyle1}
                                >
                                    상담
                                </TableCell>
                                <TableCell

                                    style={cellStyle2}
                                >
                                    조회
                                </TableCell>
                                <TableCell
                                    style={cellStyle1}
                                >
                                    이체
                                </TableCell>
                                <TableCell
                                    style={cellStyle3}
                                >
                                    환율
                                </TableCell>
                                <TableCell
                                    style={cellStyle1}
                                    onClick={() => window.localStorage.getItem('id') ? this.logout() : this.props.history.push('/login')}
                                >
                                    {window.localStorage.getItem('id') ? 'Logout' : 'Login'}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div style={{ margin: '30px 0px' }}>
                    <Table>
                        <TableBody>
                            <TableRow >
                                <TableCell style={cellIcon}>
                                    <PriceChangeIcon
                                        style={icon.icon1}
                                        onMouseEnter={() => this.handleMouseEnter('icon1')}
                                        onMouseLeave={() => this.handleMouseLeave('icon1')}
                                    />
                                </TableCell>
                                <TableCell style={cellIcon}>
                                    <SavingsIcon
                                        style={icon.icon2}
                                        onMouseEnter={() => this.handleMouseEnter('icon2')}
                                        onMouseLeave={() => this.handleMouseLeave('icon2')}
                                    />
                                </TableCell>
                                <TableCell style={cellIcon}>
                                    <MoneyIcon
                                        style={icon.icon3}
                                        onMouseEnter={() => this.handleMouseEnter('icon3')}
                                        onMouseLeave={() => this.handleMouseLeave('icon3')}
                                    />
                                </TableCell>
                                <TableCell style={cellIcon}>
                                    <CurrencyExchangeIcon
                                        style={icon.icon4}
                                        onMouseEnter={() => this.handleMouseEnter('icon4')}
                                        onMouseLeave={() => this.handleMouseLeave('icon4')}
                                    />
                                </TableCell>
                                <TableCell style={cellIcon}>
                                    <QueryStatsIcon
                                        style={icon.icon5}
                                        onMouseEnter={() => this.handleMouseEnter('icon5')}
                                        onMouseLeave={() => this.handleMouseLeave('icon5')}
                                        onClick={() => this.props.history.push('/fundList')}
                                    />
                                </TableCell>
                                <TableCell style={cellIcon}>
                                    <PaidIcon
                                        style={icon.icon6}
                                        onMouseEnter={() => this.handleMouseEnter('icon6')}
                                        onMouseLeave={() => this.handleMouseLeave('icon6')}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}
const imgStyle = {
    width: '80%',
    height: '600px',
    display: 'block'
}

const tableStyle = {
    borderRadius: '100px',
    width: '800px',
    height: '80px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    margin: '10px',
    background: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9)'
}

const cellStyle1 = {
    textAlign: 'center',
    fontSize: '25px',
    border: 'none',
    color: 'white',
    fontWeight: 700

}

const cellStyle2 = {
    textAlign: 'center',
    fontSize: '25px',
    borderLeft: '1px solid white',
    borderBottom: 'none',
    borderHeight: '10px',
    color: 'white',
    fontWeight: 700
}

const cellStyle3 = {
    textAlign: 'center',
    fontSize: '25px',
    borderRight: '1px solid white',
    borderBottom: 'none',
    borderHeight: '10px',
    color: 'white',
    fontWeight: 700
}

const middleLine = {
    borderBottom: '3px solid',
    borderImage: 'linear-gradient(135deg, #f2f2f2, #bfe5e2, #fffff0) 1',
    width: '80%'
}

const cellIcon = {
    textAlign: 'center',
    border: 'none',
    padding: '0px',
    width: '10px'
}



