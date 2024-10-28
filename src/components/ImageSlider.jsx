'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import { blogs } from "@/utils/blogs";
import { fetchBlogs } from "@/services/BlogServices";

import { Grid, Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { MdOutlineChromeReaderMode, MdCircle } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import zIndex from "@mui/material/styles/zIndex";

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#ffffff',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = [
  { id: 0, key: 'banner01', color: '#3886FF', border: '#A5C8FF', },
  { id: 1, key: 'banner02', color: '#FABB00', border: '#FFCB7E', },
  { id: 2, key: 'banner03', color: '#1ABC9C', border: '#73CDCD', },
  { id: 3, key: 'banner04', color: '#B82925', border: '#FF5253', },
]

const estimateReadingTime = text => {
  const wordsPerMinute = 250;
  return Math.ceil(text.split(/\s+/).length / wordsPerMinute);;
}

const CustomTabPanel = ({ children, value, index, deviceStyles }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography
            className="sailec-medium"
            sx={deviceStyles}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ImageSlider = ({ innerRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slides, setSlides] = useState(blogs.slice(0, 4))
  const matches = useMediaQuery('(min-width:600px)');
  const [isShort, setIsShort] = useState(false);
  const totalSlides = slides.length;
  const timeoutRef = useRef(null);

  const [title, setTitle] = useState(blogs[0].titulo)
  const [content, setContent] = useState(blogs[0].bajada)
  const [color, setColor] = useState(blogs[0].color)
  const [idBlog, setIdBlog] = useState(blogs[0].id)
  const [data, setData] = useState(null)
  const [apiLlamada, setApiLlamada] = useState(false); // Nueva bandera

  const [apiData, setApiData] = useState(null);

  const [value, setValue] = useState(0);

  const isSmallDevice = useMediaQuery("(max-width : 640px)");
  const isMediumDevice = useMediaQuery("(min-width : 641px) and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("(min-width : 769px) and (max-width : 1024px)");
  const isExtraLargeDevice = useMediaQuery("(min-width : 1025px)");
  const isShortDevice = useMediaQuery("(max-height: 700px)");

  const fetch = async () => {
    // if (!apiLlamada) {

    //     try {
    //       const response = await fetchBlogs();
    //       // const result = await response.json();
    //       setData(response);
    //       setApiLlamada(true); // Marca que ya se hizo la llamada
    //       console.log('RESULT', response)
    //     } catch (error) {
    //       console.log('ERRORSH', error.message);
    //     }
    // }
  }

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchBlogs();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const changeSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % slides.length;
    updateSlideContent(newIndex);
  }, [currentIndex, slides.length]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(changeSlide, 8000);
    return () => resetTimeout();
  }, [changeSlide]);

  const updateSlideContent = newIndex => {
    setCurrentIndex(newIndex);
    setTitle(slides[newIndex].titulo);
    setContent(truncateWords(slides[newIndex].bajada, 205));
    setColor(styles[newIndex].color);
    setIdBlog(slides[newIndex].id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imgHeightMobile = '80vh'
  const imgHeightDesktop = '100vh'

  const sliderStyles = {
    position: 'relative',
    margin: 0,
    padding: 0,
    width: '100%',
  }

  const slideStyles = {
    width: '100%',
    height: imgHeightDesktop,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    position: 'relative',
    zIndex: '-1',
  }

  const slideStylesMobile = {
    backgroundColor: styles[currentIndex].color,
    width: '100%',
    height: isShortDevice ? '100vh' : imgHeightMobile,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  const dotsContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
  }

  const dotStyles = {
    margin: isShort ? '-30px 8px' : '-50px 8px',
    cursor: 'pointer',
    // color: '#fff'
  }

  const truncateWords = (text, num) => {
    if (text.length <= num) return text;

    const sliced = text.slice(0, num);
    const indexLastBlankSpace = sliced.lastIndexOf(' ');
    return `${sliced.slice(0, indexLastBlankSpace)}...`;
  }

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex)
    setTitle(slides[slideIndex].titulo)
    setContent(truncateWords(slides[slideIndex].bajada, 205))
    setColor(styles[slideIndex].color)
    setIdBlog(slides[slideIndex].id)
  }

  const deviceStyles = {
    fontSize: isMediumDevice ? '14px' : isShortDevice ? '18px' : '20px',
    lineHeight: isMediumDevice ? '20px' : '28px',
  };

  const boxStyleDesktop = {
    alignItems: 'flex-start',
    backgroundColor: '#00000089',
    display: 'flex',
    height: imgHeightDesktop,
    margin: `calc(-${imgHeightDesktop} - 50px) auto 0px`,
    padding: '150px 0 32px 0',
    textWrap: 'pretty',
    width: '100%',
  }

  const boxStyleMobile = {
    // alignItems: 'center', Mejor sacarlo
    display: 'flex',
    height: isShortDevice ? '100vh' : imgHeightMobile, // 100vh si es chico, imgHeightMobile si es grande
    // margin: 'auto 0px',
    marginTop: isShortDevice ? '-100vh' : 'calc(-80vh)', // -100vh si es chico, 'calc(-100vh + 150px)' si es grande
    padding: '24px 16px',
    textWrap: 'pretty',
    width: '100vw',
  }

  return (
    <div id="inicio" style={matches ? { ...sliderStyles, height: imgHeightDesktop } : { ...sliderStyles, marginTop: '98px' }} ref={innerRef}>

      {matches ?
        <>
          {/* DESKTOP */}
          <div style={matches && slideStyles}>
            <Image
              src={slides[currentIndex].imagen}
              alt={slides[currentIndex].imagen}
              fill
              sizes="100vw"
              style={{
                borderRadius: '8px',
                margin: 'auto',
                objectFit: 'cover',
                objectPosition: 'top',
                overflow: 'hidden',
                zIndex: "-1",
              }}
            />
          </div>
          <Box sx={{ ...boxStyleDesktop, zIndex: 99999 }}>
            <div className="row" >
              <div className="col-sm-12 sailec" style={{
                width: '100%',
                marginLeft: '60px'
              }}>
                <div className="d-flex flex-column">
                  <h2
                    className="sailec"
                    style={{
                      marginTop: '1em',
                      color: 'white',
                      fontSize: 'clamp(48px, 48px, 72px)',
                      // fontSize: isShort ? '48px' : '72px',
                      fontWeight: 700,
                      lineHeight: isShort ? '52px' : '116px',
                      textWrap: 'balance',
                      fontFamily: 'sailec',
                    }}>
                    {slides[currentIndex].titulo}
                  </h2>
                  <p style={{ color: '#FFF' }}>
                    <MdOutlineChromeReaderMode style={{ marginTop: '-3px' }} /> {estimateReadingTime(slides[currentIndex].texto)} min.
                  </p>
                </div>
                <Grid
                  container
                  direction="row"
                >
                  <Link href={`/blog/${idBlog}`}>
                    <button
                      className={`btn submit-form me-2 sailec-medium ${'btn-' + currentIndex}`}
                      style={{
                        width: '209px',
                        height: !isShort && '56px',
                        backgroundColor: styles[currentIndex].color,
                        border: `1px solid ${styles[currentIndex].border}`,
                        borderRadius: '100px',
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: '16px',
                      }}> Ver más + </button>
                  </Link>
                </Grid>
              </div>
            </div>
          </Box>
          <div
            key={slides[currentIndex].key}
            className="col col-3"
            style={{
              borderBottom: '1px solid white',
              height: isShort ? '180px' : '200px',
              marginTop: isShort ? '-210px' : '-240px',
              marginLeft: `calc(25vw * ${slides[currentIndex].id})`,
              backgroundColor: styles[currentIndex].color,
              color: "#fff",
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CustomTabPanel
              value={slides[currentIndex].key}
              index={slides[currentIndex].key}
              deviceStyles={deviceStyles}
            // isMediumDevice={isMediumDevice}
            >
              {slides[currentIndex].bajada.slice(0, 200)}
            </CustomTabPanel>
          </div>
          <ThemeProvider theme={theme}>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="primary"
              indicatorColor="white"
            >
              {slides.map((slide, slideIndex) => (
                <Tab
                  key={slideIndex}
                  className="col-3 sailec white_menu_urls"
                  onClick={() => goToSlide(slideIndex)}
                  sx={{
                    alignItems: 'baseline',
                    bgcolor: styles[slideIndex].color,
                    color: '#fff',
                    fontFamily: 'sailec',
                    fontSize: isMediumDevice ? '16px' : isShort ? '20px' : '24px',
                    fontWeight: 700,
                    height: '97px',
                    lineHeight: isMediumDevice ? '22px' : '32px',
                    maxWidth: 'unset',
                    textAlign: 'left',
                    textTransform: 'capitalize',

                  }}
                  label={slide.titulo}
                  {...a11yProps(slideIndex)}
                />
              ))}
            </Tabs>
          </ThemeProvider>

        </> :
        <>
          {/* MOBILE */}
          <div style={{ ...slideStylesMobile }}></div>
          <Box sx={!matches && boxStyleMobile}>
            <div className="row" >
              <div className="col-sm-12 sailec" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }
              }>
                {/* <div style={{ minHeight: '30vh' }}> */}
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 700, lineHeight: '40px' }}>{title}</h2>
                <p style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '32px',
                }}
                >
                  {content.slice(0, 205)}
                </p>
                {/* </div> */}
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="baseline"
                  sx={{ width: '90vw' }}
                >
                  <Link href={`/blog/${idBlog}`}>
                    <button
                      className="btn submit-form me-2"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #FFF',
                        borderRadius: '100px',
                        color: '#FFF',
                        width: '116px',
                        height: '40px',
                        margin: '8px'
                      }}> Ver más + </button>
                  </Link>
                  <Image
                    src={slides[currentIndex].imagen}
                    alt={slides[currentIndex].imagen}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: 'auto',
                      borderRadius: '8px',
                      margin: 'auto',
                      height: '250px',
                      maxHeight: '250px',
                      objectPosition: 'center',
                      objectFit: 'cover',
                      overflow: 'hidden',
                      width: 'auto',
                      WebkitBoxShadow: '12px 12px 0px 0px rgba(166,166,166,1)',
                      MozBoxShadow: '12px 12px 0px 0px rgba(166,166,166,1)',
                      boxShadow: '12px 12px 0px 0px rgba(166,166,166,1)',
                    }}
                  />

                </Grid>
              </div>
            </div>
          </Box>
          <div style={dotsContainerStyles}>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                style={dotStyles}
                onClick={() => goToSlide(slideIndex)}
              >
                <MdCircle style={{ fontSize: '16px', color: slideIndex === currentIndex ? '#A6A6A6' : '#FFF' }} />
              </div>
            ))}
          </div>

        </>
      }
    </div>
  )
}

export default ImageSlider;