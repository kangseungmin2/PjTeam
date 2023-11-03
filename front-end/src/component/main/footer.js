import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';


export default function footer() {
  return (
    <MDBFooter style={{ backgroundColor: 'rgb(230, 229, 227)' }} className='text-white text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow style={{ display: 'flex', justifyContent: 'space-between'}}>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0' style={{ color: 'rgb(0, 0, 0)' }}>
            <h5 className='text-uppercase'>Our Bank</h5>

            <p>
            고객 중심의 디지털 은행 서비스를 제공합니다.
            안전하고 사용자 친화적인 디자인으로 계좌관리, 이체, 대출 신청, 펀드 거래 등 다양한 금융 서비스를 제공 합니다.
            </p>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0' style={{ color: 'rgb(0, 0, 0)' }}>
            <h5 className='text-uppercase'>Bank Map</h5>

            <ul className='list-unstyled mb-0' >
              <li>
                <a href='/kakaoMap' style={{ color: 'rgb(0, 0, 0)' }}>
                  은행지도
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgb(214, 214, 214)', color :  'rgb(0, 0, 0)'}}>
        &copy; {new Date().getFullYear()} 한국 ICT 인재개발원 {' '}
        <a className='text-black' href='https://mdbootstrap.com/'>
          Youtube 링크
        </a>
      </div>
    </MDBFooter>
  );
}