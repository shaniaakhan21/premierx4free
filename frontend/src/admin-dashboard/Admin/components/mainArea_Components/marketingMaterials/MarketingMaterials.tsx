// import { jsx } from '@emotion/react';
import { makeStyles } from '../../../../../utils/makeStyles';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
//import { Repeat } from '@mui/icons-material';
//import { color, display, fontWeight } from '@mui/system';
import RemoveModal from '../modal_popups/RemoveModal';
import {useMemo, useState} from 'react';
import ReplaceModal from '../modal_popups/ReplaceModal';
import UploadMoreModal from '../modal_popups/UploadMore';
import AddCategoryModal from '../modal_popups/AddCategory';
// import * as React from 'react';
//import './marketingMaterials.css'
// import axios from 'axios'
import {useAuth} from "../../../../../contexts/auth.context";
import {
    //MarketingMaterialsSummaryResponse,
    useMarketingMaterialsCategories,
    useMarketingMaterialsSummary
} from "../../../../../services/admin";
import MarketingMaterialsCategory from "../../../../../models/marketingMaterialsCategory.model";
import MarketingMaterial from "../../../../../models/marketingMaterial.model";
// import MarketingDocumentPreview from "../modal_popups/MarketingDocumentPreview";
import Categories from './Categories';


function MarketingMaterials():JSX.Element{
    const { user } = useAuth()
    const { data: categories } = useMarketingMaterialsCategories(user!)
    const { data: summaryData, mutate: refreshSummary } = useMarketingMaterialsSummary(user!)
    const {classes} = useStyles()
    const [showRemoveMaterial, setShowRemoveMaterial] = useState<MarketingMaterial | undefined>()
    const [showReplaceMaterial, setShowReplaceMaterial] = useState<MarketingMaterial | undefined>()
    const [showUploadMore, setShowUploadMore] = useState<MarketingMaterialsCategory | undefined>()
    const [showAddCategory, setShowAddCategory] = useState<boolean>(false)

    console.log("datafrom summary page",typeof categories)

    // const summaryIndexed = useMemo(() => {
    //     if (!summaryData) return {}
    //     const cats: { [key: string]: Pick<MarketingMaterialsCategory, '_id' | 'name'> & { count: number, documents: MarketingMaterial[] } } = {};
    //     summaryData?.data?.categories?.map(({ count, ...info }) => {
    //         if (!cats[info._id]) cats[info._id] = { ...info, count: 0, documents: [] }
    //         cats[info._id].count = count
    //     })
    //     summaryData?.data?.data?.map(({ documents, ...info }) => {
    //         if (!cats[info._id]) cats[info._id] = { ...info, count: 0, documents: [] }
    //         cats[info._id].documents = documents
    //     })
    //     return cats
    // }, [summaryData])

    return(
        <div className={classes.marketing_mainContainer}>
            <p className={classes.mainContainer_heading}>Marketing Materials</p>

            <div className={classes.marketing_headerContainer}>
                <p className={classes.headerContainer_heading}>Upload Documents</p>
                <button className={classes.headerContainer_button} onClick={() => setShowAddCategory(true)}>+ Add Category</button>
            </div>

            {categories?.data?.map(category => 
               <Categories category={category} /> 
            )}

            {showUploadMore ? <UploadMoreModal category={showUploadMore} onClose={(shouldReload) => {
                setShowUploadMore(undefined);
                if (shouldReload) refreshSummary()
            }} /> : null}
            {showReplaceMaterial ? <ReplaceModal document={showReplaceMaterial} onClose={(shouldReload) => {
                setShowReplaceMaterial(undefined);
                if (shouldReload) refreshSummary()
            }} /> : null}
            {showRemoveMaterial ? <RemoveModal document={showRemoveMaterial} onClose={(shouldReload) => {
                setShowRemoveMaterial(undefined);
                if (shouldReload) refreshSummary()
            }} /> : null}
            {showAddCategory ? <AddCategoryModal onClose={() => setShowAddCategory(false)}/> : null}


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
        padding:"11px 12px 10px 18px",
        '@media(max-width: 768px)':{
            fontWeight:"700",
            fontSize:"15px",
            lineHeight:"20.46px",
            padding:"10px 10px 10px 11px"
        },
        
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
        position: "relative",
        minWidth:"220px",
        height:"252px",
        border:"1px solid #D6D9DB",
        display:"flex",
        flexDirection:"column-reverse",
        borderRadius:"10px",
        overflow: 'hidden'
    },
    contentUnit_image: {
        position: 'absolute',
        objectFit: 'cover',
        width: '100%',
        height: 252
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
        marginRight:"10px",
        cursor: 'pointer',

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
        position: 'absolute',
        objectFit: 'cover',
        width: '100%',
        height: 252
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
