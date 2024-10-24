import { makeStyles } from '../../../../../utils/makeStyles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react'

interface data {
    agentData:any,
    index:number,
    dataLength:number
}

function TableRow(props:data):JSX.Element{
    const {agentData,index,dataLength} = props
    const {classes} = useStyles()
    const [toggle,setToggle] = useState(false)
    console.log('agent data from table row',index,dataLength)
    return(
        <>
        <div className={index==0?classes.firstTablerow:index==dataLength-1?classes.lastTablerow:classes.tablerow}>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/icon_person.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{agentData.firstName} {agentData.lastName}</p>
            </div>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/iconEnvelopeClosed.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{agentData.email}</p>
            </div>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/icon_phone.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{agentData.phoneNum}</p>
            </div>
            <div onClick={() => {setToggle(!toggle)}}>
               {toggle?<img src='/assets/svg/minus.svg' className={classes.headerSvg} />: <img src='/assets/svg/plus.svg' className={classes.headerSvg} />}
            </div>
            

        </div>
        {toggle ? <div className={classes.tablerow_extension}>
                    <div>
                    <Row>
                        <Col md={3}>
                            <p className={classes.detailHeading}>First Name <br /> <span className={classes.detailText}>{agentData.firstName}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Last Name <br /> <span className={classes.detailText}>{agentData.lastName}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Address <br /> <span className={classes.detailText}>{agentData.address}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>City <br /> <span className={classes.detailText}>{agentData.city}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <p className={classes.detailHeading}>State <br /> <span className={classes.detailText}>{agentData.state}</span></p>
                        </Col>
                        <Col  md={3}>
                            <p className={classes.detailHeading}>Zip Code <br /> <span className={classes.detailText}>{agentData.zip}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Referrel Link <br /> <span className={classes.detailText}>{agentData.referralLink}</span></p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className={classes.rowExtension_form_container}>
                        <div>
                            <p>NDA Agreement</p>
                            <div className={classes.upload_file}>
                                <input className={classes.upload_file_input} />
                                <div className={classes.upload_file_button}>Upload File</div>
                            </div>
                        </div>
                        <div>
                            <p>Comission Agreement</p>
                            <div className={classes.upload_file}>
                                <input className={classes.upload_file_input} />
                                <div className={classes.upload_file_button}>Upload File</div>
                            </div>
                        </div>
                        <div>
                            <p>NDA Signed</p>
                            <div style={{textAlign:"center"}}>
                            <div className={classes.checkbox_label}>
                                    <div>
                                        <input type={'checkbox'} className={classes.input_checkbox} />
                                    </div>
                                    <p>
                                        Yes
                                    </p>
                            
                            </div>
                            </div>
                        </div>
                        <div>
                            <p>Comission Agreement Signed</p>
                            <div style={{textAlign:"center"}}>
                                <div className={classes.checkbox_label}>
                                    <div>
                                        <input type={'checkbox'} className={classes.input_checkbox} />
                                    </div>
                                    <p>
                                        Yes
                                    </p>
                            
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.actionButton_container}>
                    
                        <div className={classes.approve_button_container}>
                        <div>
                            <img src='/assets/svg/icons/active.svg' className={classes.buttonIcon} />
                        </div>
                        <div className={classes.reject_button}>
                            Approve
                        </div>
                        </div>
                        
                        <div className={classes.reject_button_container}>
                        <div>
                            <img src='/assets/svg/icons/icon_reject.svg' className={classes.buttonIcon} />
                        </div>
                        <div className={classes.reject_button}>
                            Reject
                        </div>
                        </div>

                    </div>
                </div>
            </div>: <></>}
        </>
    )
}

const useStyles = makeStyles() (() => ({
    tablerow:{
        display:"flex",
        flexDirection:"row",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        //borderRadius:"10px 10px 0 0",
        borderBottom:"0px",
        padding:"22px 29px 23.62px 36px"
    },
    firstTablerow:{
        display:"flex",
        flexDirection:"row",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderBottom:"0px",
        borderRadius:"10px 10px 0 0",
        padding:"22px 29px 23.62px 36px" 
    },
    lastTablerow:{
        display:"flex",
        flexDirection:"row",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderRadius:"0 0 10px 10px",
        padding:"22px 29px 23.62px 36px" 
    },
    tablerow_extension:{
        border:"1px solid #D6D9DB",
        padding:"13px 31px 21px 30px"
    },
    detailHeading:{
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"16px",
        lineHeight:"21.82px",
        color:"#667B8B"
    },
    detailText:{
        fontWeight:"768px",
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#000000"
    },
    rowExtension_form_container:{
        display:"flex",
        flexDirection:"row",
        gap:"5%",
        backgroundColor:"#D6D9DB",
        padding:"20px",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderRadius:"10px"
    },
    upload_file:{
        display:"flex",
        flexDirection:"row"
    },
    upload_file_input:{
        width:"55%",
        borderRadius:"6px 0 0 6px",
        border:"1px solid #D6D9DB"
    },
    upload_file_button:{
        backgroundColor:"#64B5F6",
        padding:"9px 15px 8px 14px",
        borderRadius:"0 6px 6px 0"
    },
    input_checkbox:{
        width:'20px',
        height:"20px",
        clipPath:"circle(42% at 50% 50%)",
        marginBottom:"15px"
        
    },
    checkbox_label:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:"10px",
        fontWeight:'768px',
        fontSize:"18px",
        lineHeight:"24.55px",
        fontFamily:"Nunito Sans"
    },
    actionButton_container:{
        marginTop:'18px',
        display:"flex",
        flexDirection:"row-reverse",
        gap:"20px"
    },
    reject_button:{
        marginLeft:"16px"
    },
    headerSvg:{
        width:"16px",
        height:"16px"
    },
    headingDescription:{
        display:"flex",
        flexDirection:"row",
        width:"50%"
    },
    headingIcon:{
        width:"22.1px",
        height:"22.1px"
    },
    headingText:{
        marginLeft:"15px",
        fontFamily:"Nunito Sans",
        fontWeight:"400",
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#596778"
    },
    reject_button_container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        border:"2px solid #D44141",
        borderRadius:"10px",
        padding:"11px 43px 12px 33px"
    },
    approve_button_container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        border:"2px solid #80CA46",
        borderRadius:"10px",
        padding:"11px 43px 12px 33px"
    },
    buttonIcon:{
        width:"20px",
        height:"20px"
    }
}))

export default TableRow