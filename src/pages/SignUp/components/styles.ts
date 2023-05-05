import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
    container: {
        display: 'flex',
        width: '100%',
    },
    imagesigin: {
        width: '61%',
        img: {
            padding: '12% 12% 20%'
        },
    },
    
    siginform: {
        marginTop: '3%',
        h1: {
                color:'#136DA7',
                fontStyle: 'normal',
                fontWeight: '800',
                fontSize: '30px',
                lineHeight: '36px',
                textAlign:'center',
                margin:'3% 0',
                padding: '0 35% 0 20%'
        }
    },

    formControl: {
        border: '1px solid #D9D9D9!important',
        borderRadius: '2px!important',
        margin: '2% 0',
        ' &:placeholder':{
            color: 'red!important'
        }
    },

    label: {
        margin: '5% 0 0 0',
        fontSize: '14px!important',
        color: 'black!important',
        lineHeight: '22px!important',
        fontWeight: '500!important'
    },

    formhere: {
        padding: '0 25% 0 10%!important',
    },

    buttonstyle: {
        background:'#00B0F0!important',
        border:'none!important',
        borderRadius:'2px!important',
        width:'100%!important',
        color:'white!important',
        marginTop:'4%!important',
        '&:hover' :{
            background:'#0e5988!important',
            }
        },
    
    eyebtn: {
        top:'6px!important',
        border:'none!important',
        '&:hover': {
            color: '#0e5988!important',
            background: 'transparent!important'
          },
    },

    custompsd: {
        border:'none!important',
        margin:'0'
    },

    cstmpsdbox: {
        borderRadius:'2px!important',
        border:'1px solid #ced4da!important',
        display: 'flex',
        marginBottom: '5%!important',
    },

    linktosignin: {
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:'14px',
        lineHeight:'22px',
        color:'#00B0F0',
        textDecoration:'none',
        
        '&:hover': {
            color: '#0e5988!important'
        },
        
        '&:active': {
            color: '#0e5988!important'
        }
    },

    linktosignindiv: {
        textAlign:'center',
        marginTop: '6%!important',
    }



}));

export default useStyles;

