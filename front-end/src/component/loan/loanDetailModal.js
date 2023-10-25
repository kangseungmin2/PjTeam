import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Modal from 'react-modal';

// 모달 컴포넌트
class LoanDetailModal extends Component {
    render() {
        const { selectedLoan, isModalOpen, onClose } = this.props;

        if (!isModalOpen || !selectedLoan || selectedLoan.length === 0) {
            return null;
        }

        return (
            <Modal isOpen={isModalOpen} onRequestClose={onClose} appElement={document.getElementById('root')}>
                <Container component="main" maxWidth="md">
                    <Typography variant="h4" style={style}>대출상환금</Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">납입회차</TableCell>
                                    <TableCell align="center">납입원금</TableCell>
                                    <TableCell align="center">대출이자</TableCell>
                                    <TableCell align="center">월상환금</TableCell>
                                    <TableCell align="center">대출잔금</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {selectedLoan.map((repayment, index) => (
                                    <TableRow key={index}>
                                        <TableCell align='center'>{repayment.paymentRound}</TableCell>
                                        <TableCell align='center'>{repayment.repaymentAmount}</TableCell>
                                        <TableCell align='center'>{repayment.interest}</TableCell>
                                        <TableCell align='center'>{repayment.repaymentMonth}</TableCell>
                                        <TableCell align='center'>{repayment.amountBalance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Modal>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
};

export default LoanDetailModal;