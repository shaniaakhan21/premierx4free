import { makeStyles } from '../../../../../utils/makeStyles';
import Button from 'react-bootstrap/Button';
import {agentData} from '../customData'
import Table from 'react-bootstrap/Table';
import CalculationPageSecondTable from './CalculationPageSecondTable';
import CalculationPageFirstTable from './CalculationPageFirstTable';
import { agentCalculationData } from '../customData';
import { useEffect, useState } from 'react';

function CalculationPage(): JSX.Element{
    const {classes} = useStyles()
    const [tableData,setTableData] = useState(<></>)
    const [table,setTable] = useState(1)
    
    useEffect(() => {
        if(table == 1)
        {
            setTableData(<CalculationPageFirstTable agentCalculationData={agentCalculationData} />)
        }
        if(table == 2)
        {
            setTableData(<CalculationPageSecondTable agentCalculationData = {agentCalculationData} />)
        }
    },[table])
    return(
        <div className={classes.calculationPage_mainContainer} onClick={() => {setTable(2)}}>
            {/* <CalculationPageSecondTable /> */}
            {/* <CalculationPageFirstTable agentCalculationData={agentCalculationData} /> */}
            {tableData}
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    calculationPage_mainContainer:{

    } 
}))

export default CalculationPage