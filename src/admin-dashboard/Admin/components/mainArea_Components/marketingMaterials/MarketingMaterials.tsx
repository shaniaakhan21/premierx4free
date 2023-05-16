import { jsx } from '@emotion/react';
import { makeStyles } from '../../../../../utils/makeStyles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Repeat } from '@mui/icons-material';
import { color, display, fontWeight } from '@mui/system';
import RemoveModal from '../modal_popups/RemoveModal';
import { useState } from 'react';
import ReplaceModal from '../modal_popups/ReplaceModal';
import UploadMoreModal from '../modal_popups/UploadMore';
import AddCategoryModal from '../modal_popups/AddCategory';
import * as React from 'react';
import './marketingMaterials.css'


function MarketingMaterials():JSX.Element{
    const {classes} = useStyles()
    const [removeModalOpen,setRemoveModalOpen] = useState(false)
    const [replaceModalOpen,setReplaceModalOpen] = useState(false)
    const [uploadMoreModalOpen,setUploadMoreModalOpen] = useState(false)
    const [addCategoryModalOpen,setAddCategoryModalOpen] = useState(false)
    const containerWidth = 2
    const containerSm = 6
    return(
        <div className={classes.marketing_mainContainer}>
            <p className={classes.mainContainer_heading}>Marketing Materials</p>

            <div className={classes.marketing_headerContainer}>
                <p className={classes.headerContainer_heading}>Upload Documents</p>
                <button className={classes.headerContainer_button} onClick={() => {setAddCategoryModalOpen(true)}}>+ Add Category</button>
            </div>

            <div className={classes.marketing_contentContainer}>

                <div className={classes.contentContainer_heading}>
                    <p className={classes.heading_text}>Elevator Pitch for Prospect Clients</p>
                    <p><a href='#' className={classes.heading_link}>View More</a></p>
                </div>

                <Row className={classes.contentContainer_row}>
                <Col lg={containerWidth} className={classes.containerContent_contentUnit} style={{padding:0}}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button} onClick={() => {setRemoveModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button} onClick={() => {setReplaceModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </Col>

                <Col lg={containerWidth} className={classes.containerContent_contentUnitPyramid} style={{padding:0}}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button} onClick={() => {setRemoveModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button} onClick={() => {setReplaceModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </Col>

                <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                    <img src='/assets/svg/Dashboard/pdf-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button} onClick={() => {setRemoveModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button} onClick={() => {setReplaceModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </Col>

                <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                    <img src='/assets/svg/Dashboard/ppt-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button} onClick={() => {setRemoveModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button} onClick={() => {setReplaceModalOpen(true)}}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </Col>

                <Col lg={containerWidth} className={classes.containerContent_contentUnitUploadMore} onClick={() => {setUploadMoreModalOpen(true)}} >
                <img src='/assets/svg/Dashboard/upload-more-documents.svg' className={classes.containerContent_uploadMoreIcon} />
                    <div className={classes.uploadMore_buttonTitle}>
                        <p>Upload More Documents</p>
                    </div>
                </Col>


            </Row>
            </div>




            <div className={classes.marketing_contentContainer}>

                <div className={classes.contentContainer_heading}>
                    <p className={classes.heading_text}> Prospect Reps</p>
                    <p><a href='#' className={classes.heading_link}>View More</a></p>
                </div>

                <Row className={classes.contentContainer_row}>
                    <Col lg={containerWidth} className={classes.containerContent_contentUnit} style={{padding:0}}>
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPyramid} style={{padding:0}}>
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                        <img src='/assets/svg/Dashboard/pdf-icon.png' className={classes.containerContent_PdfPptIcon} />
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                        <img src='/assets/svg/Dashboard/ppt-icon.png' className={classes.containerContent_PdfPptIcon} />
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitUploadMore} onClick={() => { setUploadMoreModalOpen(true) }} >
                        <img src='/assets/svg/Dashboard/upload-more-documents.svg' className={classes.containerContent_uploadMoreIcon} />
                        <div className={classes.uploadMore_buttonTitle}>
                            <p>Upload More Documents</p>
                        </div>
                    </Col>


                </Row>
            </div>


            <div className={classes.marketing_contentContainer}>

                <div className={classes.contentContainer_heading}>
                    <p className={classes.heading_text}>Prospect Clients</p>
                    <p><a href='#' className={classes.heading_link}>View More</a></p>
                </div>

                <Row className={classes.contentContainer_row}>
                    <Col lg={containerWidth} className={classes.containerContent_contentUnit} style={{padding:0}}>
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPyramid} style={{padding:0}}>
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                        <img src='/assets/svg/Dashboard/pdf-icon.png' className={classes.containerContent_PdfPptIcon} />
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitPdfPpt} style={{padding:0}}>
                        <img src='/assets/svg/Dashboard/ppt-icon.png' className={classes.containerContent_PdfPptIcon} />
                        <div className={classes.contentUnit_buttons}>
                            <div className={classes.delete_button} onClick={() => { setRemoveModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image} />
                                <p>Remove</p>
                            </div>
                            <div className={classes.delete_button} onClick={() => { setReplaceModalOpen(true) }}>
                                <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image} />
                                <p>Replace</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={containerWidth} className={classes.containerContent_contentUnitUploadMore} onClick={() => { setUploadMoreModalOpen(true) }} >
                        <img src='/assets/svg/Dashboard/upload-more-documents.svg' className={classes.containerContent_uploadMoreIcon} />
                        <div className={classes.uploadMore_buttonTitle}>
                            <p>Upload More Documents</p>
                        </div>
                    </Col>


                </Row>
            </div>


            




                {/* Row 2 */}


            {/* <div className={classes.marketing_contentContainer}>

                <div className={classes.contentContainer_heading}>
                    <p className={classes.heading_text}>Elevator Pitch for Prospect Clients</p>
                    <p><a href='#' className={classes.heading_link}>View More</a></p>
                </div>

                <div className={classes.contentContainer_row}>
                <div className={classes.containerContent_contentUnit}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPyramid}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPdfPpt}>
                    <img src='/assets/svg/Dashboard/pdf-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPdfPpt}>
                    <img src='/assets/svg/Dashboard/ppt-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitUploadMore}>
                <img src='/assets/svg/Dashboard/upload-more-documents.svg' className={classes.containerContent_uploadMoreIcon} />
                    <div className={classes.uploadMore_buttonTitle}>
                        <p>Upload More Documents</p>
                    </div>
                </div>


            </div>
            </div>




                {/* Row 3 

            <div className={classes.marketing_contentContainer}>

                <div className={classes.contentContainer_heading}>
                    <p className={classes.heading_text}>Elevator Pitch for Prospect Clients</p>
                    <p><a href='#' className={classes.heading_link}>View More</a></p>
                </div>

                <div className={classes.contentContainer_row}>
                <div className={classes.containerContent_contentUnit}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPyramid}>
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPdfPpt}>
                    <img src='/assets/svg/Dashboard/pdf-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitPdfPpt}>
                    <img src='/assets/svg/Dashboard/ppt-icon.png' className={classes.containerContent_PdfPptIcon} />
                    <div className={classes.contentUnit_buttons}>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/delete.svg' className={classes.deleteButton_image}/>
                            <p>Remove</p>
                        </div>
                        <div className={classes.delete_button}>
                            <img src='/assets/svg/Dashboard/Replace-icon.svg' className={classes.replaceButton_image}/>
                            <p>Replace</p>
                        </div>
                    </div>
                </div>

                <div className={classes.containerContent_contentUnitUploadMore}>
                <img src='/assets/svg/Dashboard/upload-more-documents.svg' className={classes.containerContent_uploadMoreIcon} />
                    <div className={classes.uploadMore_buttonTitle}>
                        <p>Upload More Documents</p>
                    </div>
                </div>


            </div>
            </div> */}





            <RemoveModal removeModalOpen={removeModalOpen} setRemoveModalOpen={setRemoveModalOpen} />
            <ReplaceModal replaceModalOpen={replaceModalOpen} setReplaceModalOpen={setReplaceModalOpen} />
            <UploadMoreModal uploadMoreModalOpen={uploadMoreModalOpen} setUploadMoreModalOpen={setUploadMoreModalOpen} />
            <AddCategoryModal addCategoryModalOpen={addCategoryModalOpen} setAddCategoryModalOpen={setAddCategoryModalOpen} />


        </div>

       
    )
}

const useStyles = makeStyles() (() => ({
    marketing_mainContainer:{
       // backgroundColor:"lightgoldenrodyellow",
        width:"100%",
        marginBottom:"20%"
    },
    marketing_headerContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"

    },
    mainContainer_heading:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"24px",
        lineHeight:"33px",
        fontStyle:"normal",
        color:"#000000"
    },
    headerContainer_heading:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"20px",
        lineHeight:"27px",
        fontStyle:"normal",
        color:"#000000"
    },
    headerContainer_button:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"18px",
        lineHeight:"26px",
        fontStyle:"normal",
        color:"#FFFFFF",
        backgroundColor:"#64B5F6",
        border:"none",
        borderRadius:"10px",
        padding:"11px 12px 10px 18px"
    },
    
    marketing_contentContainer:{
        display:"flex",
        flexDirection:"column",
        //justifyContent:"space-evenly",
        gap:"3%",
        padding:"19px 29px 33px 33px",
        border:"1px solid #D6D9DB",
        borderRadius:"10px",
        marginTop:"13px"

    },
    contentContainer_row:{
        display:"flex",
        flexDirection:"row",
        //justifyContent:"space-evenly",
        gap:"1%", 
    },
    
    containerContent_contentUnit:{
        background:"url(/assets/svg/Dashboard/data-img.svg)",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        minWidth:"220px",
        height:"252px",
        border:"1px solid #D6D9DB",
        display:"flex",
        flexDirection:"column-reverse",
        borderRadius:"10px"

    },
    containerContent_contentUnitPyramid:{
        background:"url(/assets/svg/Dashboard/pyramid.svg)",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        minWidth:"220px",
        height:"252px",
        border:"1px solid #D6D9DB",
        display:"flex",
        flexDirection:"column-reverse",
        borderRadius:"10px"
    },
    containerContent_contentUnitPdfPpt:{
        // background:"url(/assets/svg/Dashboard/pdf-icon.png)",
        // backgroundRepeat:"no-repeat",
        // backgroundSize:"cover",
        minWidth:"220px",
        height:"252px",
        border:"1px solid #D6D9DB",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        borderRadius:"10px",
        backgroundColor:"#F8F8F8"
    },
    containerContent_contentUnitUploadMore:{
        minWidth:"220px",
        height:"252px",
        border:"1px dashed #3AA6DD",
        display:"flex",
        flexDirection:"column",
        //justifyContent:"space-between",
        gap:"32px",
        borderRadius:"10px",
        backgroundColor:"#FFFFFF",
        boxShadow:"0px 0px 34px rgba(125, 141, 148, 0.25)",
        "&:hover":{
            cursor:"pointer"
        }
    },
    contentUnit_buttons:{
        backgroundColor:"#172D39",
        opacity:"0.7",
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:"0 0 10px 10px"

    },
    delete_button:{
        display:"flex",
        flexDirection:"row",
        gap:"5px",
        color:"#ffffff",
        marginTop:"18px",
        marginLeft:"10px",
        marginRight:"10px"
        
    },
    deleteButton_image:{
        //filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(46deg) brightness(107%) contrast(102%);",
        filter:"invert(94%) sepia(94%) saturate(0%) hue-rotate(224deg) brightness(107%) contrast(106%)",
        width:"17.38px",
        height:"19.86px",
        //backgroundColor:"#FFFFFF"
    },
    replaceButton_image:{
        width:"17.38px",
        height:"19.86px"
    },
    containerContent_PdfPptIcon:{
        // width:"108px",
        // height:"108px",
        // margin:"50px auto 35px auto"
    },
    containerContent_uploadMoreIcon:{
        width:"108px",
        height:"108px",
        margin:"28px auto 10px auto"
    },
    uploadMore_buttonTitle:{
        textAlign:"center",
        //fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"22px",
        lineHeight:"30.01px",
        color:"#55666F"
    },
    contentContainer_heading:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    heading_text:{
       // fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"22px",
        lineHeight:"30.01px",
        color:"#596778"
    },
    heading_link:{
       // fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"18px",
        lineHeight:"25px",
    }
    
    
    
    
}))

export default MarketingMaterials