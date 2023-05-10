import React from "react";
import { AdminPageTitle, AdminPageWrapper } from "./style";

function AdminPageIndex() {
  return (
    <AdminPageWrapper>
      <AdminPageTitle>
        관리자 페이지에 당도한 것을 환영하오, 낯선이여.
        <br />
        우리는 우리의 훌륭한 유저들을 굽어살피는 깨우친 팀, GaBoJaGo이오.
        <br />
        이곳에는 대시보드가 들어올 예정이오. 다들 기대하시오.
      </AdminPageTitle>
    </AdminPageWrapper>
  );
}

export default AdminPageIndex;
