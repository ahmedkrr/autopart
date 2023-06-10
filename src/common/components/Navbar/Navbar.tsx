import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { GiCarWheel } from "react-icons/gi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtdecoder } from "../../../Jwtdecode";
// import { AiOutlineShoppingCart } from "react-icons/ai";
export function Navbar() {
  const [Login, setLogin] = useState(true);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("token") ?? "";
  const decodedToken = jwtdecoder(storedToken);
  const isCompanyOwner =
    decodedToken?.IsCompanyOwner.toLowerCase?.() === "true";
  const [companyowner, setcompanyowner] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const isAdmin = decodedToken?.isAdmin.toLowerCase?.() === "true";

  function handleNavigation() {
    navigate("/login");
  }
  useEffect(() => {
    if (storedToken != "") {
      setLogin(true);
      setIsAdmin(isAdmin);
      setcompanyowner(isCompanyOwner);
    } else {
      setLogin(false);
    }
  });

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAnchorElUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ background: "black" }}>
      <Container maxWidth="xl" sx={{ px: "12px !important" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", mr: 1 }}>
            <GiCarWheel size={40} />
          </Box>

          <Box onClick={() => navigate("/")}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              AutoPart
            </Typography>
          </Box>
          <Box ml={120}>
            {/* <AiOutlineShoppingCart size={33} cursor="pointer" /> */}
          </Box>
          {Login ? (
            <Box ml={12}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ pr: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {IsAdmin && (
                  <MenuItem onClick={() => navigate("/admin/Dashboard")}>
                    Admin Dashboard
                  </MenuItem>
                )}
                {companyowner || false ? (
                  <MenuItem onClick={() => navigate("/companyprofile")}>
                    My Company
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/createcompany")}>
                    Create Company
                  </MenuItem>
                )}

                {/* <MenuItem>Account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{ my: 2, color: "white", display: "block", ml: "78px" }}
                onClick={handleNavigation}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
