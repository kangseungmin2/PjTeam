import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import LoanSignApi from "../../api/loanSign";

function Identity(props) {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [name, setName] = useState(''); // 이름
    const [birthDate, setBirthDate] = useState('');
    const [serialNumber, setSerialNumber] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleUpload = async () => {
        if (file === null) {
            console.error('파일이 선택되지 않았습니다.');
            alert('파일을 업로드 해주세요.');
            return;
        }

        // FormData에 이미지 파일을 추가
        const formData = new FormData();
        formData.append('file', file);

        try {
            // 서버로 이미지 업로드
            const response = await axios.post(
                'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCdp0oJoq9_fDfzHhJByYuomHzvFuxviLk',
                {
                    requests: [
                        {
                            image: {
                                content: await getBase64(file),
                            },
                            features: [
                                {
                                    type: 'TEXT_DETECTION',
                                },
                            ],
                        },
                    ],
                }
            );

            const text = response.data.responses[0].fullTextAnnotation.text;
            setExtractedText(text);
            // 텍스트에서 이름 추출
            const nameRegex = /([가-힣]+)\s*\(/; // 한글 문자열을 추출하는 정규 표현식
            const extractedName = text.match(nameRegex);
            if (extractedName && extractedName[1]) {
                setName(extractedName[1]);
            } else {
                setName('');
            }
            const juminRegex = /(\d{6})-(\d{7})/; // 주민등록번호 형식을 추출하는 정규 표현식
            const extractedJumin = text.match(juminRegex);
            if (extractedJumin && extractedJumin[1] && extractedJumin[2]) {
                const birthDate = extractedJumin[1]; // 생년월일 (예: "800101")
                const serialNumber = extractedJumin[2]; // 일련번호 (예: "2345678")
                setBirthDate(birthDate);
                setSerialNumber(serialNumber);
            } else {
                setBirthDate('');
                setSerialNumber('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // 주민등록번호 인증
    function checkIdentity() {
        // 사용자가 입력한 주민등록번호
        const id = window.localStorage.getItem('id');
        LoanSignApi.checkIdentity(id)
            .then((res) => {
                const joinSerialNumber = res.data; // 회원가입에 입력한 주민등록번호
                console.log('회원가입주민번호', joinSerialNumber)
                // 추출된 주민등록번호
                const extractedBirthDate = birthDate;
                const extractedSerialNumber = serialNumber;

                // 전체 주민등록번호 생성
                const userFullJumin = extractedBirthDate + extractedSerialNumber;
                console.log('추출한데이터', userFullJumin)
                // 사용자가 입력한 주민등록번호와 비교
                if (userFullJumin == joinSerialNumber) {
                    // 주민등록번호 일치
                    alert('주민등록번호가 일치합니다. 대출 신청을 진행하세요.');
                    props.onSuccess(); // 주민등록 인증이 성공했을 때 onSuccess 콜백 호출
                } else {
                    // 주민등록번호 불일치
                    alert('주민등록번호가 일치하지 않습니다. 다시 확인해주세요.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <br />
            <div style={style}>
                <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                <Button variant="contained" color="success" onClick={handleUpload}> Upload </Button>
            </div>
            <br /><br />
            {/* <TextField
                id="extractedText"
                label="Extracted Text"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                value={extractedText}
            /> */}

            <FeedbackRoundedIcon fontSize='large' color='primary' />
            <Typography > 개인정보 </Typography>
            <br />
            <TextField id="name" label="name" variant="outlined" placeholder='name' value={name} />
            <div style={style2}>
                <TextField id="identityNum1" label="identityNum" variant="outlined" placeholder='identityNum' value={birthDate} />
                <Typography variant="h5"> &nbsp;-&nbsp; </Typography>
                <TextField id="identityNum2" label="identityNum" variant="outlined" placeholder='identityNum' value={serialNumber} />
            </div>

            <Button
                style={{ margin: '0 auto' }}
                color="primary"
                variant="outlined"
                onClick={checkIdentity}
            >
                인증하기                    </Button>

        </div>
    );
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}
const style2 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
}

export default Identity;