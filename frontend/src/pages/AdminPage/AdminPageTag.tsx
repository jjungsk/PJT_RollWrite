import React, { useEffect, useState } from "react";
import { AdminPageTitle, AdminPageWrapper } from "./style";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTag } from "./admin";
import { toast } from "react-hot-toast";

interface Tag {
  tagId: string;
  content: string;
}
function AdminPageTag() {
  const navigate = useNavigate();
  const [tagList, setTagList] = useState<Tag[]>();

  useEffect(() => {
    getTag().then((res) => {
      toast.success(res.message);
      setTagList(res.data);
    });
  }, []);

  return (
    <AdminPageWrapper>
      <Button variant="outlined" onClick={() => navigate("/admin")}>
        메뉴로 돌아가기
      </Button>
      <AdminPageTitle>태그 관리</AdminPageTitle>
      <TextField
        sx={{
          width: "100%",
          maxWidth: 720,
          margin: "auto",
          marginBottom: "16px",
        }}
        id="outlined-basic"
        label="태그 추가하기"
        variant="outlined"
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        {tagList?.map((tag) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={tag.content} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </AdminPageWrapper>
  );
}

export default AdminPageTag;
