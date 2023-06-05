import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PartnerChart from '../../../components/PartnerChart';
import useWindowSize from '../../../hooks/useWindowSize';
import { COLLAPSE_THRESHOLD } from '../Home.constants';
// import NSURInfo from './NSURInfo';
import { makeStyles } from '../../../utils/makeStyles';
import { useTranslation } from "react-i18next";

const partellIcon = '/assets/svg/Home/icon-partell-colored.svg'
const bmaIcon = '/assets/svg/Home/icon-bma-colored.svg'
const nsurxIcon = '/assets/svg/Home/icon-nsurx-colored.svg'
const swiftMDIcon = '/assets/svg/Home/icon-swiftmd-colored.svg'

interface InfoProps {
  descriptionVisible: boolean
}

function PartellInfo(props: InfoProps): JSX.Element {
  const { descriptionVisible } = props
  const { classes } = useStyles();
  const [tr] = useTranslation();

  const t = (key: string) => tr(`partners.parteell.${key}`);

  return (
    <>
      <Typography className={classes.infoTitle}>
        {t('title')}
      </Typography>
      {
        descriptionVisible && (
          <div className={classes.partnerDescription}>
            <Typography className={classes.infoSubtitle} style={{ color: '#136DA7!important' }}>
              {t('subtitle')}
            </Typography>
            <Typography className={classes.infoText}>
              {t('description')}
            </Typography>
          </div>
        )
      }
    </>
  )
}

function BMAInfo(props: InfoProps): JSX.Element {
  const { descriptionVisible } = props
  const { classes } = useStyles();
  //const windowSize = useWindowSize()
  const [tr] = useTranslation();

  const t = (key: string) => tr(`partners.bm.${key}`);

  return (
    <>

      <Typography className={classes.infoTitle}>
        {t('title')}
      </Typography>
      {
        descriptionVisible && (
          <div className={classes.partnerDescription}>
            <Typography className={classes.infoSubtitle} style={{ textDecoration: 'none' }}>
              {t('subtitle')}
            </Typography>
            <Typography className={classes.infoText}>
              {t('description')}
            </Typography>
          </div>
        )
      }
    </>
  )
}

function NSURXInfo(props: InfoProps): JSX.Element {
  const { descriptionVisible } = props
  const { classes } = useStyles();
  const [tr] = useTranslation();

  const t = (key: string) => tr(`partners.nsurx.${key}`);

  return (
    <>
      <Typography className={classes.infoTitle}>
        {t('title')}
      </Typography>
      {
        descriptionVisible && (
          <div className={classes.partnerDescription}>
            <Typography className={classes.infoSubtitle} style={{ color: "#64B5F6" }}>
              {t('subtitle')}
            </Typography>
            <Typography className={classes.infoText}>
              {t('description')}
            </Typography>
            {/* <Typography className={classes.infoText}>
							NSUR Inc. is dedicated to providing an innovative and convenient solution for prescription drug savings. By utilizing blockchain technology and offering unique rewards, NSURx sets itself apart from traditional prescription discount cards. Not only does it provide discounts, but it also rewards users with NSUR tokens which can be used to purchase products on the NSUR marketplace
						</Typography> */}
          </div>
        )
      }
    </>
  )
}

function SwiftMDInfo(props: InfoProps): JSX.Element {
  const { descriptionVisible } = props
  const { classes } = useStyles();
  const [tr] = useTranslation();

  const t = (key: string) => tr(`partners.swiftmd.${key}`);

  return (
    <>
      <Typography className={classes.infoTitle}>
        {t('title')}
      </Typography>
      {
        descriptionVisible && (
          <div className={classes.partnerDescription}>
            <Typography className={classes.infoSubtitle} style={{ color: "#64B5F6" }}>
              {t('subtitle')}
            </Typography>
            <Typography className={classes.infoText}>
              {t('subtitle2')}
            </Typography>
            <Typography className={classes.infoText}>
              {t('description')}
            </Typography>
          </div>
        )
      }
    </>
  )
}

function Partners(): JSX.Element {
  const { classes } = useStyles();
  const windowSize = useWindowSize()
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const isCollapsed = windowSize.width < COLLAPSE_THRESHOLD
  const [tr] = useTranslation()

  const t = (key: string) => tr(`partners.${key}`)

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title}>
          {t('title')} <img src={'/assets/svg/logo-black.svg'} />
        </Typography>
      </div>
      <Grid container className={classes.content} style={{ display: isCollapsed ? 'none' : 'flex' }}>
        <Grid item xs={12} lg={5}>
          <Box className={classes.column} style={{ paddingTop: isCollapsed ? 0 : '5%', minHeight: '100%' }}>
            <div onMouseEnter={() => setHoveredIdx(0)} onMouseLeave={() => setHoveredIdx(-1)}>
              <PartellInfo descriptionVisible={hoveredIdx === 0} />
            </div>
            <div onMouseEnter={() => setHoveredIdx(1)} onMouseLeave={() => setHoveredIdx(-1)}>
              <BMAInfo descriptionVisible={hoveredIdx === 1} />
            </div>
            <div onMouseEnter={() => setHoveredIdx(2)} onMouseLeave={() => setHoveredIdx(-1)}>
              <SwiftMDInfo descriptionVisible={hoveredIdx === 2} />
            </div>
            <div onMouseEnter={() => setHoveredIdx(3)} onMouseLeave={() => setHoveredIdx(-1)}>
              <NSURXInfo descriptionVisible={hoveredIdx === 3} />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box className={classes.column}>
            <PartnerChart onHover={setHoveredIdx} onHoverEnd={() => setHoveredIdx(-1)} />
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.content} style={{ display: isCollapsed ? 'flex' : 'none' }}>
        <Grid item className={classes.row}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={partellIcon} />
          </div>
          <PartellInfo descriptionVisible />
        </Grid>
        <Grid item className={classes.row}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={bmaIcon} />
          </div>
          <BMAInfo descriptionVisible />
        </Grid>
        <Grid item className={classes.row}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={swiftMDIcon} />
          </div>
          <SwiftMDInfo descriptionVisible />
        </Grid>
        <Grid item className={classes.row}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={nsurxIcon} />
          </div>
          <NSURXInfo descriptionVisible />
        </Grid>
      </Grid>
    </div>
  )
}


const useStyles = makeStyles()(() => ({
  container: {
    backgroundColor: "#FFFFFF",
    background: 'url(/assets/images/partners-bg.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
    padding: '3%',
    margin: '2% 4%',
    ['@media screen and (min-width: 768px)']: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%',
    },
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    ' & p': {
      color: 'black!important',
    }
  },
  title: {
    fontWeight: 800,
    fontSize: 24,
    textAlign: 'center',
    ['@media screen and (min-width: 768px)']: {
      fontSize: 32
    },
    ['@media screen and (min-width: 1024px)']: {
      fontSize: 36
    },

    img: {
      width: '35%'
    }

  },
  content: {
    marginTop: 24,
    ['@media screen and (min-width: 768px)']: {
      marginTop: '2.5%'
    },
  },
  row: {
    marginBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    ['@media screen and (max-width: 768px)']: {
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'justify'
    },
  },
  column: {
    paddingLeft: 24,
    paddingRight: 24
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    ['@media screen and (min-width: 768px)']: {
      fontSize: 24
    },
    ['@media screen and (min-width: 1024px)']: {
      fontSize: 28
    },
    color: '#136DA7!important',
    textDecoration: 'underline'
  },
  infoSubtitle: {
    marginTop: 12,
    fontWeight: 800,
    fontSize: 16,
    ['@media screen and (min-width: 768px)']: {
      fontSize: 18
    },
    ['@media screen and (min-width: 1024px)']: {
      fontSize: 20
    },
    color: "#136DA7!important",
  },
  infoText: {
    fontWeight: 400,
    marginTop: 10,
    fontSize: 16,
    ['@media screen and (min-width: 768px)']: {
      fontSize: 18
    },
    ['@media screen and (min-width: 1024px)']: {
      fontSize: 20
    },
  },
  partnerDescription: {
    animation: '$fade 1s linear',
  },
  '@keyframes fade': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  },
}))

export default Partners
