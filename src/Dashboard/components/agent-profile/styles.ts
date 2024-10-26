import { makeStyles } from "../../../utils/makeStyles"

const useStyles = makeStyles()(() => ({
    profileBody: {
        background: 'linear-gradient(210deg, #64B5F6 1.82%, #0556A7 100%)',
        padding: '8%',

    },
    cardCustBody: {
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        color: 'white!important',
        img: {
            padding: '10%'
        }
    },
    cardText:{
        color: 'white!important',
    }


}));

export default useStyles