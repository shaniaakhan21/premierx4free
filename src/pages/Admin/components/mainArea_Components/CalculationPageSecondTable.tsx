import { makeStyles } from '../../../../utils/makeStyles';

function CalculationPageSecondTable () : JSX.Element{
    const {classes} = useStyles()
    return(
        <>
        <div className={classes.calculationPage_heading}>
            <p className={classes.calculationPage_headingText}>Calculation</p>
            <button className={classes.calculationPage_headingButton}>Back</button>
            </div>
            <div className={classes.calculationPage_tableContainer}>

            <table className={classes.calculationPage_table}>
        <thead >
          <tr className={classes.table_header}>
            <th className={classes.table_headingText_first}>Referral Agent Name</th>
            <th className={classes.table_headingText}>Contract<br /> Start Date</th>
            <th className={classes.table_headingText}>Contract<br />  End Date</th>
            <th className={classes.table_headingText}>Monthly Membership<br />  Paid (No. of People)</th>
            <th className={classes.table_headingText}>Membership<br />  Number</th>
            <th className={classes.table_headingText}>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.table_row}>
            <td className={classes.table_data_first}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
          </tr>
          <tr className={classes.table_row}>
            <td className={classes.table_data_first}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
            <td className={classes.table_data}>Table cell</td>
          </tr>
        </tbody>
      </table>

            </div>
            </>
    )
}

const useStyles = makeStyles() (() =>({
    calculationPage_heading:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
        //alignItems:"center"
    },
    calculationPage_headingText:{
        marginTop:"10px",
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"24px",
        lineHeight:"32.74px",
        color:"#000000"
    },
    calculationPage_headingButton:{
        marginBottom:"10px",
        padding:"4px 33px 5px 34px",
        border:"1px solid #86A9B8",
        backgroundColor:"#FFFFFF",
        color:"#48748D",
        borderRadius:"10px"
    },
    calculationPage_mainContainer:{
        // backgroundColor:"lightblue"
    },
    calculationPage_tableContainer:{
        marginTop:"10px",
        border:"1px solid #D6D9DB",
       // borderBottom:"0",
        //borderTop:"0",
        borderRadius:"10px",
    },
    calculationPage_table:{
       border:"1px solid #D6D9DB",
       width:"100%",
       borderRadius:"10px",
       overflow:"hidden"
       //borderCollapse:"separate"
    },
    table_header:{
        border:"1px solid #D6D9DB",
        backgroundColor:"#D6D9DB",
        padding:"8px 44px 6px 21px",
        borderRadius:"10px"
       
        
    },
    table_headingText:{
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"20px",
        lineHeight:"27.28px",
        color:"#000000",
        padding:"23px 0 20px 0"
    },
    table_headingText_first:{
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"20px",
        lineHeight:"27.28px",
        color:"#000000",
        padding:"23px 0 20px 20px"
    },
    table_row:{
        border:"1px solid #D6D9DB",
        // display:"flex",
        // flexDirection:"row",
        width:"100%"
    },
    table_data:{
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#667B8B",
        padding:"23px 0 20px 0"
    },
    table_data_first:{
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#667B8B",
        padding:"23px 0 20px 20px"
    }
}))


export default CalculationPageSecondTable