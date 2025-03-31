"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./navBar.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import { oAuthAtom } from "@/lib/atom";
import { useSession } from "next-auth/react";

const pages2 = [
  { name: "Cómo funciona", src: "/#howWorks" },
  { name: "Guías", src: "/guides" },
  { name: "Servicio Premium", src: "/premium" },
  { name: "Blog", src: "/blog" },
  { name: "Bonos", src: "/bonos" },
];
function NavBar() {

  const [cookies] = useCookies(["token"]); // Leer las cookies

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  
  const { data: session, status } = useSession();
  console.log(session,"ES LA SESION");
  
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Filtrar las páginas para mostrar "Servicio Premium" solo si no hay token
  const filteredPages = pages2.filter((page) =>
    page.name === "Servicio Premium" ? !cookies.token : true
  );

  return (
    <AppBar position="static" className="navBar__bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/ "
            sx={{
              mr: 6,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {filteredPages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link href={page.src}>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages2.map((page, index) => (
              <Link
                className="navBar__link"
                key={index}
                style={{ textDecoration: "none" }}
                onClick={handleCloseNavMenu}
                href={page.src}
              >
                {page.name}
              </Link>
            ))}
          </Box>
          {cookies.token || session ? (
            <Link style={{ textDecoration: "none" }} href={"/me"}>
              <button className="NavBar__RegisterBTN">
                <PersonIcon />
                USUARIO
              </button>
            </Link>
          ) : (
            <Link style={{ textDecoration: "none" }} href={"/auth/register"}>
              <button className="NavBar__RegisterBTN">
                <PersonIcon />
                REGÍSTRATE
              </button>
            </Link>
          )}
          <div className="NavBar__SocialIcons">
            <TelegramIcon fontSize="medium" />
            <YouTubeIcon fontSize="medium" />
            <XIcon fontSize="medium" />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
