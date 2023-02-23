import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
    container1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '1% 15%',
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
        '&:first-child': {
          alignItems: 'flex-start',
          flex: '0 0 40%',
          
      },

      '&:last-child, &:nth-last-child(2), &:nth-last-child(3)': {
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0px 0px 20px 7px #8080805e',
        },

      },
  
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0',
      borderBottom:'0.5px solid #8080802e',
    },
    check: {
        color: '#52c41a',
        height: '1.6em'
    },
    times: {
      color: 'red',
      height: '1.6em'
    },
    borderNo:{
        border: 'none!important'
    },
    h6: {
        fontSize: '1.2rem!important',
        '@media (max-width: 768px)': {
          fontSize: '1rem!important',
        },
    },
    upgradebtn:{
        borderRadius: '0!important',
        width: '100%!important',
        padding: '7px 0px!important',
        border: '1px solid #00B0F0!important',
        background: '#00B0F0!important',
        display:'none'

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
      span: {
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }

    },

  }));

export default useStyles;

