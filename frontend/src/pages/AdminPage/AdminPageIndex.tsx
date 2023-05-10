import React from "react";
import Button from "@mui/material/Button";
import {
  AdminPageIndexBtnContainer,
  AdminPageTitle,
  AdminPageWrapper,
} from "./style";
import { useNavigate } from "react-router-dom";

function AdminPageIndex() {
  const navigate = useNavigate();

  const moveTo = (path: string) => {
    navigate(`/admin/${path}`);
  };

  return (
    <AdminPageWrapper>
      <AdminPageTitle>관리자 페이지</AdminPageTitle>
      <AdminPageIndexBtnContainer>
        <Button variant="outlined" onClick={() => moveTo("notice")}>
          공지사항
        </Button>
        <Button variant="outlined" onClick={() => moveTo("admin")}>
          관리자
        </Button>
        <Button variant="outlined" onClick={() => moveTo("user")}>
          사용자
        </Button>
        <Button variant="outlined" onClick={() => moveTo("tag")}>
          태그
        </Button>
        <Button variant="outlined" onClick={() => moveTo("group")}>
          생성된 모임
        </Button>
      </AdminPageIndexBtnContainer>
    </AdminPageWrapper>
  );
}

export default AdminPageIndex;
