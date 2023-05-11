import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { AdminPageTitle } from "./style";
import { useAppSelector } from "../../constants/types";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const container = window.document.body;
  const drawerWidth = 240;
  const navItems = [
    { id: 1, name: "공지사항", path: "notice" },
    { id: 2, name: "사용자", path: "user" },
    { id: 3, name: "모임", path: "group" },
    { id: 4, name: "태그", path: "tag" },
  ];

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentPath = location.pathname;
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin) {
      const rootElement = document.querySelector("#root") as HTMLElement;
      rootElement.style.minWidth = "0";
      rootElement.style.maxWidth = "100vw";
    }
  }, [isLogin]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const moveTo = (path: string) => {
    navigate(`/admin/${path}`);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, cursor: "pointer" }}
        onClick={() => moveTo("")}
      >
        Rollwrite
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => moveTo(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
              onClick={() => moveTo("")}
            >
              Rollwrite
            </Typography>
            <Box
              sx={{ flexGrow: 5, display: { xs: "none", sm: "block" } }}
            ></Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => moveTo(item.path)}
                  sx={{ color: "#fff" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <div style={{ marginTop: "70px" }}>
        <AdminPageTitle>{currentPath.split("/")[2]}</AdminPageTitle>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
