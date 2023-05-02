import { makeStyles } from "../../../utils/makeStyles"

const useStyles = makeStyles()(() => ({
    profileBody: {
        background: 'linear-gradient(205.19deg, #64B5F6 1.82%, #0556A7 100%)',
        padding: '8%',

    },
    cardCustBody: {
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        color: 'white',
        img: {
            padding: '10%'
        }
    }


}));

export default useStyles