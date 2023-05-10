import {
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Switch,
} from "@mui/material";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import React, { useEffect, useState } from "react";
import { AdminPageWrapper } from "./style";
import { getUser, userTypeChange } from "./admin";
import { toast } from "react-hot-toast";

interface User {
  nickname: string;
  profileImage: string;
  userId: number;
  userType: string;
}

function AdminPageUser() {
  const [userList, setUserList] = useState<User[]>();
  const [checked, setChecked] = React.useState(true);
  const [type, setType] = React.useState("user");
  useEffect(() => {
    getUser(type).then((res) => {
      toast.success(res.message);
      setUserList(res.data);
    });
  }, [type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    type === "user" ? setType("admin") : setType("user");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    userTypeChange(target.value).then((res) => {
      toast.success(res.message);
      getUser(type).then((res) => {
        setUserList(res.data);
      });
    });
  };

  return (
    <AdminPageWrapper>
      <Typography variant="h3" gutterBottom>
        {type}
      </Typography>
      <div>
        변경
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        {userList?.map((user, i) => (
          <div key={user.userId}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Button
                  variant="outlined"
                  value={user.userId}
                  startIcon={<ManageAccountsRoundedIcon />}
                  onClick={handleClick}
                >
                  타입 변경
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar alt={user.nickname} src={user.profileImage} />
              </ListItemAvatar>
              <ListItemText
                primary={user.nickname}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      User Type -{" "}
                    </Typography>
                    {user.userType}
                  </React.Fragment>
                }
              />
            </ListItem>
            {i < userList.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </div>
        ))}
      </List>
    </AdminPageWrapper>
  );
}

export default AdminPageUser;
