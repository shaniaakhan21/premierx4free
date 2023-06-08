import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
  containsPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseStudy: {
    mixBlendMode: 'multiply'
  }
}));

export default useStyles;

