import { makeStyles } from '../../../../../utils/makeStyles';
import CalculationPageSecondTable from './CalculationPageSecondTable';
import { agentCalculationData } from '../customData';

function CalculationPage(): JSX.Element {
    const { classes } = useStyles()
    return (
        <div className={classes.calculationPage_mainContainer} >
            <CalculationPageSecondTable agentCalculationData={agentCalculationData} />
        </div>
    )
}

const useStyles = makeStyles()(() => ({
    calculationPage_mainContainer: {

    }
}))

export default CalculationPage