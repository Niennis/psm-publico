'use client'
/* eslint-disable no-unused-vars */
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSection } from "@/context/SectionContext";
import ReserveBtn from "./ReserveBtn";
import Link from "next/link";
import { logo } from "./imagepath";
import { useMediaQuery } from "@mui/material";
import { Tooltip, Avatar } from '@mui/material';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const pagesWithEvents = [
  { title: 'TEST AUTODIAGNÓSTICO?', url: '/#test_autodiagnostico', label: 'test_autodiagnostico' },
  { title: 'EVENTOS', url: '/#eventos', label: 'eventos' },
  { title: 'PREGUNTAS FRECUENTES', url: '/#preguntas_frecuentes', label: 'preguntas_frecuentes' },
  { title: 'MATERIAL DESCARGABLE', url: '/material_descargable', label: 'material_descargable' },
  { title: 'QUIÉNES SOMOS', url: '/quienes_somos', label: 'quienes_somos' },
];

const pagesWithoutEvents = [
  { title: 'TEST AUTODIAGNÓSTICO', url: '/#test_autodiagnostico', label: 'test_autodiagnostico' },
  { title: 'PREGUNTAS FRECUENTES', url: '/#preguntas_frecuentes', label: 'preguntas_frecuentes' },
  { title: 'MATERIAL DESCARGABLE', url: '/material_descargable', label: 'material_descargable' },
  { title: 'QUIÉNES SOMOS', url: '/quienes_somos', label: 'quienes_somos' },
];

const subMenu = [
  { title: 'Intervenciones', url: '/como_trabajamos', label: '/como_trabajamos' },
  { title: 'Plan de Acción', url: '/plan-de-accion-en-salud-mental', label: '/plan-de-accion-en-salud-mental' },
  { title: 'Prevención', url: '/intervencion-en-promocion-y-prevencion', label: '/intervencion-en-promocion-y-prevencion' },
  { title: 'Convenios y profesionales', url: '/como_trabajamos/convenios-y-profesionales', label: '/convenios-y-profesionales' },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { activeSection, setActiveSection } = useSection();
  const open = Boolean(anchorEl);
  const EVENTS = 0;
  const pages = EVENTS !== 0 ? pagesWithEvents : pagesWithoutEvents
  const matches = useMediaQuery('(min-width:600px)');
  const [style, setStyle] = useState({ width: 'min-content' });

  const BOTON_RESERVAR = process.env.NEXT_PUBLIC_ACTIVATE_BUTTON === "true"
  
  const isSmallDevice = useMediaQuery(
    "only screen and (max-width : 640px)"
  );
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 641px) and (max-width : 768px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1024px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1025px)"
  );
  const isDesktop = useMediaQuery('(min-width:768px)');
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 900) {
        setStyle({ width: '6px' });
      } else if (width < 1450) {
        setStyle({ width: 'min-content' });
      } else {
        setStyle({ width: 'fit-content' });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    // Limpia el event listener cuando el componente se desmonte
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // setActiveSection(id);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <AppBar position="fixed"
      style={{
        background: 'white',
        color: 'black',
        justifyContent: matches ? 'center' : 'flex-end',
        margin: "0", // 0 72px
        maxHeight: '112px',
        minHeight: '98px',
        width: '100vw',
      }}
    >
      <Container maxWidth="false" style={{ background: 'white', color: 'black' }}>
        <Toolbar disableGutters>
          {isDesktop ? (
            <>
              {/* MENU DASHBOARD */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', lg: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontFamily: 'sailec'
                }}
              >
                <Image
                  alt="Logo"
                  src={`${process.env.NEXT_PUBLIC_BASE_IMG}logo02.png${process.env.NEXT_PUBLIC_KEY_IMG}`}
                  height={0}
                  width={0}
                  priority
                  sizes="100%"
                  style={{
                    height: '70px',
                    width: '263px',

                  }}
                />{" "}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                {pages.map((page) => {
                  return (
                    <Link style={{ color: 'black', textDecoration: 'none' }} href={page.url} key={page.title} >
                      <Button
                        className={`sailec ${activeSection === page.label
                          ? 'active-header'
                          : ''
                          }`}

                        onClick={() => handleNavClick(page.label)}
                        sx={{ ...style, fontFamily: 'sailecmedium', my: 2, color: 'black', display: 'block' }}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  )
                }
                )}
                <Tooltip title="Como trabajamos">
                  <Button
                    className={`sailec ${activeSection === 'como_trabajamos'
                      ? 'active-header'
                      : ''
                      }`}
                    onClick={handleOpenUserMenu} sx={{ ...style, p: 0, m: '0 15px 0 0', fontFamily: 'sailecmedium', color: 'black', marginTop: '16px', marginBottom: '16px' }}>
                    CÓMO TRABAJAMOS
                  </Button>
                </Tooltip>

                <Box sx={{ flexGrow: 0 }} className={`sailec `}>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {subMenu.map((setting) => (
                      <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" className="sailec">
                          <a href={setting.url} style={{ color: 'black', fontFamily: 'sailec', textDecoration: 'none' }}>
                            {setting.title}
                          </a>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </>
          ) : (
            <>
              {/*  MENU MOBILE */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', lg: 'none' },
                  }}
                >
                  {
                    pages.map((page) => (
                      <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" className="sailec">
                          <a href={page.url} style={{ color: 'black', fontFamily: 'sailec' }}>
                            {page.title}
                          </a>
                        </Typography>
                      </MenuItem>
                    ))
                  }
                  <MenuItem onClick={handleOpenUserMenu}>
                    <Typography textAlign="center" className="sailec" sx={{ color: '#000000', fontFamily: 'sailec' }}>
                      CÓMO TRABAJAMOS <FaChevronDown />
                    </Typography>
                  </MenuItem>

                  <Box sx={{ flexGrow: 0 }} className={`sailec `}>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {subMenu.map((setting) => (
                        <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" className="sailec">
                            <a href={setting.url} style={{ color: 'black', fontFamily: 'sailec', textDecoration: 'none' }}>
                              {setting.title}
                            </a>
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: { xs: 0, lg: 2 },
                  display: { xs: 'flex', lg: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontFamily: 'sailec',
                }}
              >
                <Image
                  src={'https://github.com/Niennis/imagesudp/blob/main/UDP_Logo_small.png?raw=true'}
                  height={0}
                  width={0}
                  alt="logo udp"
                  sizes="100%"
                  style={{
                    height: 'auto',
                    width: '100px',
                  }} />{" "}
              </Typography>

            </>
          )}

          {
           BOTON_RESERVAR  ?
            <Box sx={{ flexGrow: 0 }}>
              <ReserveBtn text={'Reservar'} bgColor={'#FABB00'} color={'#000'} />
              <Link href="#" style={{ textDecoration: 'none', cursor: 'not-allowed' }} >
                <FaUserCircle style={{ fontSize: matches ? '50px' : '38px', color: '#000', border: '1px solid #ff5253', borderRadius: '50px', padding: '5px', marginLeft: '5px', background: '#b82925', color: '#fff', fontFamily: 'sailec' }} />
              </Link>
            </Box>
            : ''
          }

        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Header;
