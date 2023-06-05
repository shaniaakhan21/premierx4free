import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '../../../utils/makeStyles';
import Carousel from './Carousel';
import { Trans, useTranslation } from "react-i18next";

function TeamInfo(): JSX.Element {
  const { classes } = useStyles()
  const [tr] = useTranslation()

  const t = (key: string) => tr(`team.${key}`)

  return (
    <div className={classes.container}>
      <Box style={{ marginTop: '2.5%' }}>
        <Typography variant='h6' className={classes.title}>
          {t('meet-the-team')}
        </Typography>
        <Box className={classes.columns}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.text}>
                <Trans i18nKey="team.team-description" components={{ br: <br /> }} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Carousel />
            </Grid>
          </Grid>
        </Box>

      </Box>
    </div>
  );
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "white",
    padding: '6%',
    paddingTop: '1%',
    paddingBottom: '12%',
    ['@media screen and (min-width: 768px)']: {
      paddingBottom: '2%',
    },
  },
  title: {
    color: "#136DA7",
    fontSize: 'calc(1.8vw + 16px)',
    fontWeight: '700',
    ['@media screen and (max-width: 768px)']: {
      paddingLeft: '0%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(4vw + 12px)',
    },
  },
  columns: {
    marginTop: '1%',
  },
  text: {
    color: "#000000!important",
    fontSize: 'calc(0.5vw + 14px)',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(2vw + 6px)',
    },
    textAlign: 'justify',
  }
}))

export default TeamInfo
