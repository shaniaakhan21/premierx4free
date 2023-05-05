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
        '&:first-child': {
          alignItems: 'flex-start',
          flex: '0 0 44%',
          
      },

      '&:last-child, &:nth-last-child(2)': {
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0px 0px 20px 7px #8080805e',
        },

      },
      '@media (max-width: 600px)': {
        flex: '0 0 21%',
        '&:first-child': {
        margin: '2%',
        padding: '1%',
        flex: '0 0 26%'
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
        height: '1.6em',
        '@media (max-width: 600px)': {
          height: '1rem!important'
        },
    },
    times: {
      color: 'red',
      height: '1.6em',
      '@media (max-width: 600px)': {
        height: '1rem!important'
      },
    },
    borderNo:{
        border: 'none!important'
    },
    h6: {
        textAlign:'start',
        fontSize: '1.2rem!important',
        '@media (max-width: 768px)': {
          fontSize: '1rem!important',
        },

        '@media (max-width: 600px)': {
          fontSize: '0.7rem!important'
        },

        '@media (max-width: 527px)': {
          fontSize: '0.5rem!important'
        },
    },
    upgradebtn:{
        borderRadius: '0!important',
        width: '100%!important',
        padding: '7px 0px!important',
        border: '1px solid #00B0F0!important',
        background: '#00B0F0!important',
        display:'none',

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
      },

      '@media (max-width: 600px)': {
        fontSize: '10px!important',
        span:{
        fontSize: '12px!important', 
        },
      },

    },

  }));

export default useStyles;

