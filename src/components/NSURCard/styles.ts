import { makeStyles } from '../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  innerContainer: {
    height: '100%',
    position: 'relative',
    width: '100%'
  },
  cardInner: {
    position: 'absolute',
    top: '40%',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%'
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    marginTop: '2.5%',
    flexDirection: 'row'
  },
  cardContentColumn: {
    flex: 1
  },
  whiteTxt: {
    color: '#FFFFFF',
    fontSize: 18,
  }
}));

export default useStyles;