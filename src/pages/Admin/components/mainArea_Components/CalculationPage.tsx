import { makeStyles } from '../../../../utils/makeStyles';
import Button from 'react-bootstrap/Button';
import {agentData} from './customData'
import Table from 'react-bootstrap/Table';
import CalculationPageSecondTable from './CalculationPageSecondTable';
import CalculationPageFirstTable from './CalculationPageFirstTable';

function CalculationPage(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.calculationPage_mainContainer}>
            {/* <CalculationPageSecondTable /> */}
            <CalculationPageFirstTable />
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    calculationPage_mainContainer:{

    } 
}))

export default CalculationPage