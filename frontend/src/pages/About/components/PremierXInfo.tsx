import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '../../../utils/makeStyles';
import { Trans, useTranslation } from "react-i18next";

function PremierXInfo() {
  const { classes } = useStyles();
  const [tr] = useTranslation();

  const t = (key: string) => {
    const translation = tr(`about.${key}`);
    return translation || '';
  };

  const getSubtitleText = (key: string) => {
    const subtitleText = t(key);
    return subtitleText || null;
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <div className={classes.mission}>
          <h3>{t('mission-title')}</h3>
          <Trans i18nKey="about.mission-description" components={{ 1: <p />, 2: <span />, 3: <b /> }}>
            <p>
              <span><b /></span>
            </p>
          </Trans>
        </div>
      </div>
      <Box className={classes.columns}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' className={classes.subtitle}>
            {t('what-is-premierx')}: 
          </Typography>
          <Typography className={classes.text}>
            {t('what-is-premierx-description')}
          </Typography>
          {getSubtitleText('how-we-do-it-title') && (
            <Trans i18nKey="how-we-do-it-title">
		  </Trans>
          )} <br></br>
          <div className={classes.text}>
            <ul>
              {[0, 1, 2, 3, 4, 5].map((n) => <li>{t(`how-we-do-it[${n}]`)}</li>)}
            </ul>
          </div>
        </Grid>
      </Box>
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '3%',
    paddingTop: '1%',
    paddingBottom: '4%',
    '@media screen and (min-width: 768px)': {
      paddingBottom: '4%',
    },
  },

  imgContainer: {
    backgroundImage: "url('/assets/svg/Home/landing.svg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: '25px'
  },

  subtitle: {
    color: '#136DA7!important',
    fontSize: '33px',
    fontWeight: '700',
    lineHeight: 1.2,
    '@media screen and (max-width: 768px)': {
      fontSize: 27,
    },
  },
  columns: {
    margin: '2.5% 16% 0',
    display: 'flex',
    flexWrap: 'wrap',
    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
      margin: '5%',
    },
  },
  text: {
    color: '#136DA7!important',
    fontSize: 18,
    textAlign: 'justify',
    fontFamily: 'Nunito Sans',
    fontWeight: 400
  },

  mission: {
    width: '32%',
    color: 'white',
    display: 'flex',
    padding: '2% 3%',
    margin: '9%',
    background: 'linear-gradient(210deg, #64B5F6 1.82%, #0556A7 100%)',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    '@media screen and (max-width: 768px)': {
      padding: '5% 3%!important',
      margin: '13%!important',
      width: '100%!important'
    },
    p: {
      fontSize: '22px',
      fontWeight: '100',
      color: '#ffffffd2',
      '@media screen and (max-width: 768px)': {
        fontSize: '17px'
      }

    },
    h3: {
      fontWeight: '900',
    },
  },

}))

export default PremierXInfo
