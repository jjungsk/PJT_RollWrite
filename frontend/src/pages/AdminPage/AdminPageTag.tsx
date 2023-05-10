import React from "react";
import { AdminPageTitle, AdminPageWrapper } from "./style";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminPageTag() {
  const navigate = useNavigate();

  return (
    <AdminPageWrapper>
      <Button variant="outlined" onClick={() => navigate("/admin")}>
        메뉴로 돌아가기
      </Button>
      <AdminPageTitle>태그 관리</AdminPageTitle>
    </AdminPageWrapper>
  );
}

export default AdminPageTag;
