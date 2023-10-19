import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';

function Identity() {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file === null) {
            console.error('No file selected.');
            return;
        }

        // FormData에 이미지 파일을 추가
        const formData = new FormData();
        formData.append('file', file);

        try {
            // 서버로 이미지 업로드
            const response = await axios.post('/loanSign/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 서버에서 이미지 업로드 후 Vision API로 텍스트 추출 요청
            const visionResponse = await axios.post('/loanSign/extract-text', {
                image: response.data, // 이미지를 저장한 경로 또는 정보
            });

            // Vision API의 응답에서 추출된 텍스트를 상태에 설정
            setExtractedText(visionResponse.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <br />
            <div style={style}>
                <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                <Button variant="contained" color="success" onClick={handleUpload}> Upload </Button>
            </div>
            <br /><br />
            <FeedbackRoundedIcon fontSize='large' color='primary'/>
            <Typography > 개인정보 </Typography>
            <br/>
            <TextField id="name" label="name" variant="outlined" placeholder='name'/>
            <div style={style2}>
                <TextField id="identityNum1" label="identityNum" variant="outlined" placeholder='identityNum' />
                <Typography variant="h5"> &nbsp;-&nbsp; </Typography>
                <TextField id="identityNum2" label="identityNum" variant="outlined" placeholder='identityNum' />
            </div>
        </div>
    );
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