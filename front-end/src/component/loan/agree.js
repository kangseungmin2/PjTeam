import React, { useState } from 'react';
import { Box } from "@mui/material";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Checkbox from '@mui/material/Checkbox';


export default function Agree({ checked, onCheckboxChange }) {

  return (
    <Box sx={{ maxWidth: 500 }}>
      <br />
      <MDBAccordion>

        <MDBAccordionItem collapseId={1} headerTitle={"【 금리인하 】"}>
          <p><strong>금리인하요구권이란?</strong></p>
          <p style={{ textAlign: 'left' }}>금융소비자가 본인의 신용상태가 개선되었다고 판단되는 경우(취업, 승진, 재산증가, 개인신용평점 상승 등) 은행에 자신이 적용받는 금리인하를 요구할 수 있는 권리(은행법 제30조의 2)를 말합니다.<br /><br />
            ※ 단, 정책자금대출, 집단대출 등 신용상태가 금리에 영향을 미치지 않는 상품은 금리인하 요구 대상에서 제외됩니다.<br />
            금리인하요구권은 영업점 방문 및 비대면채널(인터넷 뱅킹, 스마트 뱅킹 등)을 통해 신청가능하며(신청시기, 횟수제한 없음), 은행은 금리인하를 요구하는 고객에게 신용상태 개선을 확인하는데 필요한 자료를 제출 하도록 요구할 수 있습니다.<br />
            신용상태의 개선이 경미하여 금리인하 요구 인정 요건을 충족하지 못하는 경우 등 은행 심사 결과에 따라 고객의 금리인하 요구는 수용되지 않을 수 있습니다.<br />
            은행은 금리인하 요구를 받은 날부터 10영업일 이내(고객에게 자료의 보완을 요구하는 날부터 자료가 제출되는 날까지의 기간은 포함되지 않습니다.)에 금리인하 요구 수용 여부 및 그 사유를 알려드립니다.</p>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} headerTitle={"【 청약철회 】"}>
          <p style={{ textAlign: 'left' }}>일반금융소비자는 대출계약을 체결한 경우 대출실행일 다음 날로부터 14일 내에 계약에 대한 청약을 철회할 수 있습니다.<br />
            다만, 철회권을 행사하여 효력이 발생한 이후에는 이를 취소할 수 없습니다.<br />
            청약철회를 위해서는 영업점, 인터넷뱅킹, 스마트뱅킹 등으로 은행에 청약 철회의 의사표시를 해야 하며, 이미 수령한 대출금과 이에 대한 이자, 대출과 관련하여 은행이 제3자에게 부담한 인지세, 근저당권설정비용 등을 반환하여야 합니다.<br />
            대출계약 철회권을 행사한 경우에는 중도상환해약금이 면제되며, 5영업일이내에 해당 대출과 관련한 대출정보가 삭제됩니다.<br />
            대출계약 철회권을 남용하여 해당 은행을 대상으로 최근 1개월 내에 2회 이상 대출계약을 철회하는 경우, 대출 취급 시 대출한도, 금리우대 제한 등 불이익이 발생할 수 있습니다.</p>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle={"【 계약해지 】"}>
          <p><strong>위법계약해지권이란?</strong></p>
          <p style={{ textAlign: 'left' }}>금융회사가 『금융소비자보호에 관한 법률』 상 다음의 의무를 위반하여 대출계약을 체결한 경우, 금융소비자는 해당 계약을 위약금 등 수수료 부과 없이 해지할 수 있습니다.<br /><br />
            * 적합하지 아니하다고 인정되는 대출계약의 체결을 권유한 경우(법 제17조 제3항 위반)<br />
            * 대출상품이 적정하지 않은 경우에도 사실을 알리지 않거나 확인받지 않은 경우(법 제17조 제2항 위반)<br />
            * 설명의무를 이행하지 않은 경우(법 제20조 제1항 위반)<br />
            * 불공정영업행위를 한 경우(법 제20조 제1항 위반)<br />
            * 부당권유행위를 한 경우(법 제21조 위반)<br /><br />
            금융소비자는 위법계약해지권 행사를 위해 계약 체결일로부터 5년 이내 범위에서 위반사실을 안 날로부터 1년 이내에 계약해지요구서에 위반사실을 입증하는 서류를 첨부하여 계약의 해지를 요구하여야합니다.</p>
        </MDBAccordionItem>
      </MDBAccordion>
      <br />
      <span style={{ color: "red", fontSize: '13px' }}>※ 필수</span>
      <span style={{ color: "red", fontSize: '13px' }}>모든 이용약관을 확인 하였으며, 이의 동의합니다.</span>
      <Checkbox
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        checked={checked}
        onChange={onCheckboxChange}
      />
    </Box>
  );
}