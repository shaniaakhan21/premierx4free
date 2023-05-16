import { makeStyles } from '../../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({

  mainConatiner: {
    background: '#F9F9F9',
    display: 'flex',
    position: 'relative',
    top: '15px',
    padding: '6%',
    borderBottom: '1px solid #D6D9DB',
    borderTop: 0,

    '@media (max-width:768px)': {
      flexDirection: 'column',
    },

  },

  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '& span': {
      fontSize: '24px',
      fontFamily: ' Nunito Sans ',

      ['@media screen and (max-width: 768px)']: {
        fontSize: '20px',
        fontWeight: '600'
      },
    },

  },

  customit: {
    paddingLeft: '10%',
    '@media (max-width:768px)': {
      paddingLeft: '0',
    },

  },

  refercontainer: {
    display: 'flex',
    padding: '2%',
    justifyContent: 'flex-start',
  },

  agentbox: {
    padding: '4%',
    width: '100%',
  },

  copylinkit: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      paddingRight: '3%'
    },
    '& a': {
      color: '#0556A7'
    }
  },

  subsubcontainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginBottom: '10px',
    padding: '4% 10% 4% 24%',
    borderRadius: '100px',
    background: 'white',
    boxShadow: '1px 0px 34px rgba(0, 0, 0, 0.15)',
    border: '1px solid #DEE1EB',
    alignItems: 'center',
    '& a': {
      fontSize: '20px',
      fontFamily: ' Nunito Sans ',
      '@media (max-width:768px)': {
        fontSize: '17px',
      },
      '@media (max-width:400px)': {
        fontSize: '12px',
      },

    },

    '@media (max-width:768px)': {
      padding: '2% 10% 2% 24%',
    },
  },

  line: {
    borderRight: '2px solid #DEE1EB',
    height: '40px',
    paddingLeft: '9%'
  },

  areaCustom: {
    width: '100%',
    height: '100px',
    border: '1px solid #D6D9DB',
    padding: '2%'
  },

  modalHeader: {
    borderBottom: 'none!important'
  },

  modalFooter: {
    borderTop: 'none!important'
  },

  buttonWhite: {
    background: '#FFFFFF!important',
    border: '1px solid #86A9B8!important',
    borderRadius: '10px!important',
    color: '#48748D!important',
    padding: '1% 7%!important'
  },

  buttonBlue: {
    background: '#64B5F6!important',
    border: '1px solid #86A9B8!important',
    borderRadius: '10px!important',
    color: 'white!important',
    padding: '1% 7%!important'
  },

  boxModal: {
    background: '#1e3e485e',
    paddingTop: '11%'
  },

  modalTitle: {
    fontSize: '23px!important'
  }

}));

export default useStyles;