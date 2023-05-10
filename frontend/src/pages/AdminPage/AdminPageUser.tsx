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
import AdminPageDialog from "./AdminPageDialog";

interface User {
  nickname: string;
  profileImage: string;
  userId: number;
  userType: string;
}

interface DialogInfo {
  title: string;
  content?: string;
  user: User;
}

function AdminPageUser() {
  const [userList, setUserList] = useState<User[]>();
  const [dialogInfo, setDialogInfo] = useState<DialogInfo>();
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);

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

  const onAgree = () => {
    dialogInfo &&
      userTypeChange(dialogInfo.user.userId).then((res) => {
        toast.success(res.message);
        getUser(type).then((res) => {
          setUserList(res.data);
        });
      });
  };

  const handleClickOpen = (user: User) => {
    setOpen(true);
    setDialogInfo({
      title: `${user.nickname}을 ${
        user.userType === "USER" ? "Admin으로" : "User로"
      } 변경하시겠습니까?`,
      user: user,
    });
  };

  return (
    <AdminPageWrapper>
      <AdminPageDialog
        open={open}
        setOpen={setOpen}
        title={dialogInfo?.title}
        onAgree={onAgree}
      />
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
                  startIcon={<ManageAccountsRoundedIcon />}
                  onClick={() => handleClickOpen(user)}
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
