import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminPageWrapper } from "./style";
import { getUser } from "./admin";

function AdminPageUser() {
  const [userList, setUserList] = useState();

  useEffect(() => {
    getUser("user").then((res) => {
      console.log(res);
      setUserList(res);
    });
  });
  return (
    <AdminPageWrapper>
      <div>사용자 관리</div>
      <List
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </AdminPageWrapper>
  );
}

export default AdminPageUser;
