import { makeStyles } from "../../../utils/makeStyles"

const useStyles = makeStyles()(() => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxShadow: '1px 0px 34px rgba(0, 0, 0, 0.15)',
        padding: '2%',
        img: {
            paddingRight: '1%'
        },
        a:{
            color: '#0556A7!important',
            fontFamily:'Roboto,"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol" ',
            fontSize: '18px',
        }
    },


}));

export default useStyles