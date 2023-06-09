import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
  containsPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseStudy: {
    mixBlendMode: 'multiply',
    width: '80%',
    maxWidth: 1024,
    '@media screen and (max-width: 768px)': {
      width: '100%',
    },
  }
}));

export default useStyles;

