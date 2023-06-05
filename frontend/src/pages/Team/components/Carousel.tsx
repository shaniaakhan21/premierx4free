import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '../../../utils/makeStyles';
import { useTranslation } from "react-i18next";


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
  const [tr] = useTranslation()

  const t = (key: string) => tr(`team.${key}`)

  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        {['#6E98EB', '#64B5F6', '#2A88F7', '#5BADC9', '#329CE1', '#49859A'].map((color, key) => (
          <div className={classes.container}>
            <h3 className={classes.heading} style={{ color }}>{t(`carousel[${key}].title`)}</h3>
            <p className={classes.ptext}>{t(`carousel[${key}].description`)}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}


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
  heading: {
    marginTop: 0,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 40,
    fontFamily: 'Nunito Sans',
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
    textAlign: 'justify',
    color: 'black!important',
    fontFamily: 'Nunito Sans',
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
      borderRadius: '50%',
      background: 'white',
      color: 'white',
      lineHeight: 0,
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
    '& .slick-dots li.slick-active button:before': {
      fontSize: '1px',
      border: '1px solid black',
      borderRadius: '50%',
      background: '#64B5F6',
      color: '#64B5F6',
      '@media (max-width: 768px)': {
        fontSize: '2px',
      },
      '@media (max-width: 576px)': {
        fontSize: '3px',
      },
    },
    '& .slick-dots': {
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
