import { makeStyles } from '../../../../../utils/makeStyles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react'
import { uploadFileRequest } from '../../../../../services/uploadFile';
import { useAuth } from '../../../../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';


interface dataRow {
    data:any,
    index:number,
    dataLength:number
}



function TableRow(props:dataRow):JSX.Element{
    interface agentFilesInterface{
        ndaFile?:any,
        contractFile?:any
    }
    const {data,index,dataLength} = props
    const {classes} = useStyles()
    const [toggle,setToggle] = useState(false)
    const [agentFiles,setAgentFiles] = useState<agentFilesInterface>()
    const {user} = useAuth()
    console.log('agent data from table row',data,index,dataLength)
    const navigate = useNavigate()

    

    const uploadFile = async() => {
        if(agentFiles?.ndaFile)
        {
            let formData = new FormData()
            formData.append("file", agentFiles?.ndaFile[0]);
            formData.append("fileName", agentFiles?.ndaFile[0].name);
            console.log("user from agent data dash",)
            await uploadFileRequest(formData,user?.jwtToken ?? "",{agentID:data?.agentId,fileType:"NDA"})
        }
        if(agentFiles?.contractFile)
        {
            let formData = new FormData()
            formData.append("file", agentFiles?.contractFile[0]);
            formData.append("fileName", agentFiles?.contractFile[0].name);
            console.log("user from agent data dash",)
            await uploadFileRequest(formData,user?.jwtToken ?? "",{agentID:data?.agentId,fileType:"contract"})
        }
        window.location.reload()
    }
    
    return(
        <>
        <div className={index==0?classes.firstTablerow:index==dataLength-1?classes.lastTablerow:classes.tablerow}>
            <div className={classes.tableRow_agentDetails}>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/icon_person.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{data?.name}</p>
            </div>

            <div className={classes.tableRow_agentDetails_two}>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/iconEnvelopeClosed.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{data.name}</p>
            </div>
            <div className={classes.headingDescription}>
                <div><img src='/assets/svg/icons/icon_phone.svg' className={classes.headingIcon} /></div>
                <p className={classes.headingText}>{data.contactNo}</p>
            </div>

            </div>


            </div>

            <div>
            <div onClick={() => {setToggle(!toggle)}}>
               {toggle?<img src='/assets/svg/minus.svg' className={classes.headerSvg} />: <img src='/assets/svg/plus.svg' className={classes.headerSvg} />}
            </div>
            </div>
            
            

        </div>
        {toggle ? <div className={classes.tablerow_extension}>
                    <div className={classes.table_agent_email}>

                    <div className={classes.headingDescription}>
                        <div><img src='/assets/svg/icons/iconEnvelopeClosed.svg' className={classes.headingIcon} /></div>
                        <p className={classes.headingText}>{data.name}</p>
                    </div>
                    <div className={classes.headingDescription}>
                        <div><img src='/assets/svg/icons/icon_phone.svg' className={classes.headingIcon} /></div>
                        <p className={classes.headingText}>{data.contactNo}</p>
                    </div>

                    </div>
                    <div className={classes.table_agent_info}>
                    <Row>
                        <Col md={3}>
                            <p className={classes.detailHeading}>First Name <br /> <span className={classes.detailText}>{data.name}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Last Name <br /> <span className={classes.detailText}>{data.name}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Address <br /> <span className={classes.detailText}>{data.location.address}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>City <br /> <span className={classes.detailText}>{data.location.city}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <p className={classes.detailHeading}>State <br /> <span className={classes.detailText}>{data.location.state}</span></p>
                        </Col>
                        <Col  md={3}>
                            <p className={classes.detailHeading}>Zip Code <br /> <span className={classes.detailText}>{data.location.zip}</span></p>
                        </Col>
                        <Col md={3}>
                            <p className={classes.detailHeading}>Referrel Link <br /> <span className={classes.detailText}>{"coming soon"}</span></p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className={classes.rowExtension_form_container}>
                        <Col md={4} className={classes.form_container_element}>
                            <p>NDA Agreement</p>
                            <div className={classes.upload_file}>
                                <input className={classes.upload_file_input} value={agentFiles?.ndaFile[0]?agentFiles.ndaFile[0].name:""} />
                                <label className={classes.upload_file_button}>
                                    <input type='file' style={{display:"none"}} onChange={(e)=>{setAgentFiles({...agentFiles,ndaFile:e.target?.files})}} />
                                    Upload File
                                </label>
                            </div>
                        </Col>
                        <Col md={4} className={classes.form_container_element}>
                            <p>Comission Agreement</p>
                            <div className={classes.upload_file}>
                                <input className={classes.upload_file_input} value={agentFiles?.contractFile?agentFiles.contractFile[0].name:""} />
                                <label className={classes.upload_file_button}>
                                    <input type='file' style={{ display: "none" }} onChange={(e)=>{setAgentFiles({...agentFiles,contractFile:e.target?.files})}} />
                                    Upload File
                                </label>
                            </div>
                        </Col>
                        <Col md={2} className={classes.form_container_element}>
                            <p>NDA </p>
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
                        </Col>
                        <Col md={2} className={classes.form_container_element}>
                            <p>Comission</p>
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
                        </Col>
                        
                    </Row>
                    <div style={{display:"flex",flexDirection:"row-reverse"}}>
                    <button className={classes.saveButton} onClick={() => {uploadFile()}}>save</button>
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
        justifyContent:"space-between",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        //borderRadius:"10px 10px 0 0",
        borderBottom:"0px",
        padding:"22px 29px 23.62px 36px",
        '@media (max-width:768px)':{
            padding:"22px 16px 23px 16px"
            //flexDirection:"column"
        }, 
    },
    firstTablerow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderBottom:"0px",
        borderRadius:"10px 10px 0 0",
        padding:"22px 29px 23.62px 36px",
        '@media (max-width:768px)':{
            padding:"22px 16px 23px 16px"
            //flexDirection:"column"
        },  
    },
    lastTablerow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderRadius:"0 0 10px 10px",
        padding:"22px 29px 23.62px 36px",
        '@media (max-width:768px)':{
            padding:"22px 16px 23px 16px"
            //flexDirection:"column"
        }, 
    },
    tablerow_extension:{
        border:"1px solid #D6D9DB",
        padding:"13px 31px 21px 30px",
        '@media (max-width:768px)':{
            padding:0,
            //flexDirection:"column"
        },
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
        //gap:"5%",
        backgroundColor:"#D6D9DB",
        padding:"20px",
        fontFamily:"Nunito Sans",
        border:"1px solid #D6D9DB",
        borderRadius:"10px",
        '@media (max-width:768px)':{
            margin:"0 !important",
            padding:0,
            borderRadius:0
            //flexDirection:"column"
        },
        
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
        width:"50%",
        '@media (max-width:768px)':{
            width:"100%"
            //flexDirection:"column"
        }, 
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
    // reject_button_container:{
    //     display:"flex",
    //     flexDirection:"row",
    //     justifyContent:"space-between",
    //     border:"2px solid #D44141",
    //     borderRadius:"10px",
    //     padding:"11px 43px 12px 33px"
    // },
    // approve_button_container:{
    //     display:"flex",
    //     flexDirection:"row",
    //     justifyContent:"space-between",
    //     border:"2px solid #80CA46",
    //     borderRadius:"10px",
    //     padding:"11px 43px 12px 33px"
    // },
    // buttonIcon:{
    //     width:"20px",
    //     height:"20px"
    // },
    saveButton:{
        padding:"12px 42px 11px 42px",
        backgroundColor:"#64B5F6",
        borderRadius:"6px",
        margin:"10px"
    },
    tableRow_agentDetails:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%",
        '@media (max-width:768px)':{
            justifyContent:"space-between"
            //flexDirection:"column"
        },
    },
    tableRow_agentDetails_two:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%",
        '@media (max-width:768px)':{
            display:"none",
            //flexDirection:"column"
        },
    },
    form_container_element:{
        marginTop:"17px !important"
    },
    table_agent_info:{
        padding:"14px 86px 25px 15px"
    },
    table_agent_email:{
        backgroundColor:"#D6D9DB",
        width:"100%",
        padding:"14px 86px 25px 15px",
        '@media (min-width:768px)':{
            display:"none"
            //flexDirection:"column"
        },
    }
}))

export default TableRow