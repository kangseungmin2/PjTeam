import React from 'react';
import { Box } from "@mui/material";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Checkbox from '@mui/material/Checkbox';

export default function SavingAgreement({ checked, onCheckboxChange }) {

  return (
    <Box sx={{ maxWidth: 500 }}>
      <br />
      <MDBAccordion>
        <MDBAccordionItem collapseId={1} headerTitle={"적금 계약 동의"}>
          <p><strong>적금 계약 동의란?</strong></p>
          <p style={{ textAlign: 'left' }}>적금 상품을 신규로 계약하거나 기존 적금 계약을 수정할 때 해당 적금 상품에 대한 동의 및 약관에 동의하는 것을 의미합니다.<br /><br />
            적금 계약 동의는 해당 적금 상품의 이자율, 적금 기간, 입금 및 출금 규정, 적금 해지 조건 등에 대한 규정을 이해하고 동의하는 것을 의미하며, 계약 동의 시 적금 상품의 특성을 확인하는 중요한 단계입니다.<br />
            동의를 통해 적금 계약이 성립되며, 계약 내용에 따라 적금 상품이 운용됩니다.</p>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} headerTitle={"금리 및 이자 지급 동의"}>
          <p><strong>금리 및 이자 지급 동의란?</strong></p>
          <p style={{ textAlign: 'left' }}>적금 상품의 이자율 및 이자 지급 방식에 동의하는 것을 의미합니다.<br /><br />
            적금 상품은 일정한 이자율을 가지며, 적금 계약 동의 시 해당 이자율을 확인하고 동의하여야 합니다.<br />
            이자는 정기적으로 혹은 만기 시에 지급되며, 이자 지급 방식 역시 동의사항 중 하나입니다. 금리 및 이자 지급에 관한 내용을 정확히 이해하고 동의하셔야 합니다.</p>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle={"적금 해지 및 잠금 기간 동의"}>
          <p><strong>적금 해지 및 잠금 기간 동의란?</strong></p>
          <p style={{ textAlign: 'left' }}>적금 상품의 해지 조건 및 잠금 기간에 대해 동의하는 것을 의미합니다.<br /><br />
            적금 상품은 일정한 해지 조건을 가지며, 이를 충족하면 적금을 해지할 수 있습니다. 또한, 잠금 기간 동안 적금을 해지할 경우 일정한 제한이 있을 수 있습니다.<br />
            적금 상품의 해지 및 잠금 기간에 동의하여 해당 규정에 따라 적금을 관리하실 수 있습니다.</p>
        </MDBAccordionItem>
      </MDBAccordion>
      <br />
      <span style={{ color: "red", fontSize: '13px' }}>※ 필수</span>
      <span style={{ color: "red", fontSize: '13px' }}>모든 동의사항을 확인하였으며, 이에 동의합니다.</span>
      <Checkbox
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        checked={checked}
        onChange={onCheckboxChange}
      />
    </Box>
  );
}
