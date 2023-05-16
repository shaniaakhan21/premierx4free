import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '1% 17%',
    padding: '2%',
    '@media (max-width: 768px)': {
      margin: '2%',
      padding: '1%',
    },

  },
  col: {
    flex: '0 0 17%',
    padding: '9px 0px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin:'1%',
    '&:first-of-type': {
      alignItems: 'flex-start',
      flex: '0 0 44%',

    },
    '&:nth-last-of-type(2)': {
      '@media (max-width: 400px)': {
        paddingTop: '18px!important'
      }
    },

    '&:last-child, &:nth-last-of-type(2)': {
      '&:hover': {
        transform: 'scale(1)',
        boxShadow: '0px 0px 20px 7px #8080805e',
      },

    },
    '@media (max-width: 768px)': {
      flex: '0 0 17%',
      '&:first-of-type': {
        margin: '2%',
        padding: '1%',
        flex: '0 0 57%'
      }},

    '@media (max-width: 400px)': {
      flex: '0 0 19%',
      '&:first-of-type': {
        margin: '2%',
        padding: '1%',
        flex: '0 0 54%'
      },

    },

  },
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: '4px 0',
    borderBottom:'0.5px solid #8080802e',
  },
  check: {
    color: '#52c41a',
    height: '1.6em',
    '@media (max-width: 768px)': {
      height: '0.8rem!important'
    },
  },
  times: {
    color: 'red',
    height: '1.6em',
    '@media (max-width: 768px)': {
      height: '1rem!important'
    },
  },
  borderNo:{
    border: 'none!important',
    h6: {
      '@media (max-width: 768px)': {
        margin: '0!important'
      },
    }
  },

  firstCol:{
    h6 : {
      '@media (max-width: 768px)': {
        marginBottom: '0.4rem!important'}
    }
  },

  h6: {
    textAlign:'start',
    fontSize: '1.2rem!important',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '0.52rem!important',
      fontWeight: 'bold'
    },
  },

  upgradebtn:{
    borderRadius: '0!important',
    width: '100%!important',
    padding: '7px 0px!important',
    border: '1px solid #64B5F6!important',
    background: '#64B5F6!important',
    display:'none',
    '@media (max-width: 768px)': {
      fontSize: '0.6rem!important'
    },

  },
  redbtn: {
    background: 'red!important',
    border: '1px solid red!important',
  },
  btnp:{
    margin:0,
    width: '100%',

  },
  para: {
    margin: 0,
    padding: '2%',
    boxShadow: '0px 0px 11px 4px #80808024',
    border: '0.1px solid #00000017',
    width: '100%',
    span: {
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },

    '@media (max-width: 768px)': {
      fontSize: '10px!important',
      span:{
        fontSize: '12px!important',
      },
    },

  },

  containspage: {
    height: '80vh'
  },

  secondcol: {
    check: {
      '@media (max-width: 768px)': {
        margin: '0px 0px -1px 0px!important'
      }
    },
  },

}));

export default useStyles;

