import { makeStyles } from '../../../utils/makeStyles';

const useStyles = makeStyles()(() => ({
    container: {
        display: 'flex',
        width: '100%',
        paddingBottom: '6%',
    },
    imagesigin: {
        width: '61%',
        img: {
            padding: '12% 12% 20%',
            width: '100%',
 
            '@media (max-width:768px)': {
                display: 'none'
            },

        },
    },

    siginform: {
        marginTop: '3%!important',
        paddingRight: '8%!important',
        '@media (max-width:768px)': {
            padding: '3% 8% 3% 11%!important'
        },
        
        h1: {
            color: '#136DA7!important',
            fontStyle: 'normal',
            fontWeight: '800',
            textAlign: 'center',
            margin: '3% 15%',

            fontSize: '30px', // default for xs screens
            '@media (max-width:768px)': {
                textAlign: 'left',
                width:'99%',
                margin:0,
                fontSize: '28px'
            },
            '@media (min-width:768px)': {
                fontSize: '16px', // for sm screens and up
            },
            '@media (min-width:960px)': {
                fontSize: '22px', // for md screens and up
            },
            '@media (min-width:1280px)': {
                fontSize: '30px', // for lg screens and up
            },
            '@media (min-width:1920px)': {
                fontSize: '37px', // for xl screens and up
            },
        }
    },

    formControl: {
        border: '1px solid #D9D9D9!important',
        borderRadius: '2px!important',
        margin: '2% 0',
        ' &:placeholder': {
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

    buttonstyle: {
        background: '#64B5F6!important',
        border: 'none!important',
        borderRadius: '2px!important',
        width: '100%!important',
        color: 'white!important',
        marginTop: '4%!important',
        '&:hover': {
            background: '#0e5988!important',
        }
    },

    eyebtn: {
        top: '6px!important',
        border: 'none!important',
        '&:hover': {
            color: '#0e5988!important',
            background: 'transparent!important'
        },
    },

    custompsd: {
        border: 'none!important',
        margin: '0'
    },

    cstmpsdbox: {
        borderRadius: '2px!important',
        border: '1px solid #ced4da!important',
        display: 'flex',
        marginBottom: '5%!important',
    },

    linktosignin: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#136DA7!important',
        textDecoration: 'underline',
        marginBottom: '3%!important',

        '&:hover': {
            color: '#0e5988!important'
        },

        '&:active': {
            color: '#0e5988!important'
        }
    },

    linktosignindiv: {
        textAlign: 'center',
        marginTop: '6%!important',
    },
    extrapadding: {
        marginTop: '4%!important',
        padding: '3%',
        background: '#a1b0b51a'
    },

    notalink: {
        fontSize: '13px',
        color: '#93a4aa',
        fontWeight: '400'
    },

    formhere: {
        padding: '0',
        width: '100%!important',
    }




}));

export default useStyles;

