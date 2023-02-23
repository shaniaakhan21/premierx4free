import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '../../../utils/makeStyles';



function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
  };
  const { classes } = useStyles()
  
  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        <div className={classes.container}>
          <h3 className={classes.heading} style={{ color: '#6E98EB' }}>Affordability</h3>
          <p className={classes.ptext}>We believe every person should have access to affordable prescription medications if not completely free. We will always strive to have the lowest prices as compared to all of our competitors.</p>
        </div>
        <div className={classes.container}>
          <h3 className={classes.heading }  style={{ color: '#00B0F0' }}>Flexibility</h3>
          <p className={classes.ptext}>We believe that being flexible in a difficult world should always be a top priority. We will work with those Companies/Individuals that need special attention because of medical needs and circumstances.</p>
        </div>
        <div className={classes.container}>
          <h3 className={classes.heading }  style={{ color: '#2A88F7' }}>Reliability</h3>
          <p className={classes.ptext}>We believe as a Company that our word and our reputation are everything! Nothing is more important. To that end, we have partnered and surrounded our Company with the most experienced and professional Companies in the health care and pharmaceutical industries that are reliable </p>
        </div>
        <div className={classes.container}>
          <h3 className={classes.heading }  style={{ color: '#5BADC9' }}>Accountability</h3>
          <p className={classes.ptext}>We believe as a Company that being accountable to you the patient will help us gain your trust and reliance in us. We must be able to deliver the medications when we you need them where you need them. Nothing else matters.</p>
        </div>
        <div className={classes.container}>
          <h3 className={classes.heading }  style={{ color: '#329CE1' }}>Experience</h3>
          <p className={classes.ptext}>We believe that experience in the Health and Wellness industry is an absolute must. Our team and our partners have decades of experience and have the experience necessary to fulfil every obligations to deliver to you the best healthcare products available in the market.</p>
        </div>
        <div className={classes.container}>
          <h3 className={classes.heading }  style={{ color: '#49859A' }}>Transparency</h3>
          <p className={classes.ptext}>We believe as a Company that there has been very little transparency in the health and wellness space to date. We hear it everyday in the media outlets. We are changing that forever. We will always show you our base cost and our expenses so that you can be 100% sure you are getting the very best price available in</p>
        </div>
      </Slider>
    </div>
  );
};


const useStyles = makeStyles()(() => ({
  container: {
    marginLeft: '20%',
    '@media (max-width: 1200px)': {
      marginLeft: '15%',
    },
    '@media (max-width: 992px)': {
      marginLeft: '10%',
    },
    '@media (max-width: 768px)': {
      marginLeft: '5%',
    },
    '@media (max-width: 576px)': {
      marginLeft: '0',
    },
  },
  heading:{
    marginTop: 0,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 40,
    fontFamily: 'Roboto,"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    '@media (max-width: 1200px)': {
      fontSize: '5vw',
    },
    '@media (max-width: 768px)': {
      fontSize: '6vw',
    },
  },
  ptext: {
    paddingRight: '21%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '19px',
    textAlign:'justify',
    fontFamily: 'Roboto,"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    '@media (max-width: 1200px)': {
      fontSize: '1.8vw',
    },
    '@media (max-width: 992px)': {
      paddingRight: '10%',
    },
    '@media (max-width: 768px)': {
      paddingRight: '5%',
      fontSize: '2.5vw',
    },
    '@media (max-width: 576px)': {
      paddingRight: '2%',
      fontSize: '3vw',
    },
  },
  carousel: {
    '& .slick-dots li button:before': {
      fontSize: '0px',
      border: '1px solid black',
      borderRadius:'50%',
      background: 'white',
      color:'white',
      lineHeight:0,
      width: '15px',
      height: '15px',
      '@media (max-width: 768px)': {
        fontSize: '0px',
        width: '20px',
        height: '20px',
      },
      '@media (max-width: 576px)': {
        fontSize: '0px',
        width: '17px',
        height: '17px',
      },
    },
    '& .slick-dots li.slick-active button:before':{
      fontSize: '1px',
      border: '1px solid black',
      borderRadius:'50%',
      background: '#00B0F0',
      color:'#00B0F0',
      '@media (max-width: 768px)': {
        fontSize: '2px',
      },
      '@media (max-width: 576px)': {
        fontSize: '3px',
      },
    },
    '& .slick-dots':{
      marginLeft: '10%',
      '@media (max-width: 1200px)': {
        marginLeft: '5%',
      },
      '@media (max-width: 992px)': {
        marginLeft: '2.5%',
      },
      '@media (max-width: 768px)': {
        marginLeft: '0',
      },
    }
  },
}))


export default Carousel;
