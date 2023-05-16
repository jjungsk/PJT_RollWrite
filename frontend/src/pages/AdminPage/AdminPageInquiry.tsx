import React, { useEffect, useState } from "react";
import { AdminPageWrapper } from "./style";
import { Inquiry } from "./type";
import { toast } from "react-hot-toast";
import {
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Paper,
  Avatar,
} from "@mui/material";
import { getInquiryList } from "./admin";

function AdminPageInquiry() {
  const [inquiryList, setInquiryList] = useState<Inquiry[]>();

  useEffect(() => {
    getInquiryList().then((res) => {
      toast.success(res.message);
      setInquiryList(res.data);
    });
  }, []);

  return (
    <AdminPageWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">사용자</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">사진</TableCell>
              <TableCell align="center">내용</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiryList?.map((inquiry) => (
              <TableRow
                key={inquiry.inquiryId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "16px",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      alt={inquiry.userNickname}
                      src={inquiry.userProfileImage}
                    />
                    {inquiry.userNickname}
                  </div>
                </TableCell>
                <TableCell align="center">{inquiry.createdAt}</TableCell>
                <TableCell align="center">
                  <img
                    src={`${inquiry.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt="img"
                    loading="lazy"
                    style={{ maxHeight: "100px" }}
                  />
                </TableCell>
                <TableCell align="center">{inquiry.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminPageWrapper>
  );
}

export default AdminPageInquiry;
