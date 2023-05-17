import useStyles from '../../Plans/components/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function TeamInfo(): JSX.Element {
  const { classes } = useStyles();
  const [isHovered, setIsHovered] = useState({
    premium: false,
    standard: false,
    noPlan: false,
  });

  const handleMouseEnter = (column: string) => {
    setIsHovered((prevState) => {
      return {
        ...prevState,
        [column]: true,
        premium: column === 'premium' ? true : false,
        standard: column === 'standard' ? true : false,
        noPlan: column === 'noPlan' ? true : false,
      };
    });
  };

  const handleMouseLeave = (column: string) => {
    setIsHovered((prevState) => {
      return {
        ...prevState,
        [column]: false,
      };
    });
  };
  return (
    <div className={classes.containspage}>
        <div className={classes.container1}>
            <div className={ `${classes.col} ${classes.firstCol}`}>
                <div className={`${classes.row} ${classes.borderNo}`}><h6 style={{ opacity:0}}>Hi</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>Telehealth Included</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>No Fee Telehealth Doctor Consulations</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>1,088 Free Generic Medications</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>Free Delivery On 90 Day Prescription Supply</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>NSURx Prescription Discount Card</h6></div>
                <div className={classes.row}><h6 className={classes.h6}>Dedicated Pharmacy With Nationwide Delivery</h6></div>
            </div>
            <div  className={`${classes.col} ${classes.secondcol}`}  onMouseEnter={() => handleMouseEnter('premium')}  onMouseLeave={() => handleMouseLeave('premium')}>
                <div className={classes.row}><h6 className={classes.h6} style={{ fontWeight:'bold'}}>Premium Pack</h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}  ${classes.btnp}`}>
                {isHovered.premium && (<Button variant="primary" className={classes.upgradebtn}>Upgrade</Button>)}
                </div>
            </div>
            {/* <div  className={classes.col}  onMouseEnter={() => handleMouseEnter('standard')}  onMouseLeave={() => handleMouseLeave('standard')}>
                <div className={classes.row}><h6 className={classes.h6} style={{ fontWeight:'bold'}}>Standard Pack</h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check" className={classes.check} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}  ${classes.btnp}`}>
                   {isHovered.standard && ( <Button variant="primary" className={classes.upgradebtn}>Upgrade</Button> ) }
                </div>
            </div> */}
            <div  className={classes.col}  onMouseEnter={() => handleMouseEnter('noPlan')}  onMouseLeave={() => handleMouseLeave('noPlan')}>
                <div className={classes.row}><h6 className={classes.h6} style={{ fontWeight:'bold'}}>Current Plan</h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6  className={classes.h6} style={{ color:'red', fontWeight:'bold'}}>Few</h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times" className={classes.times} /></h6></div>
                <div className={`${classes.row} ${classes.borderNo} ${classes.btnp}`}>
                   {isHovered.noPlan && (<Button variant="secondary" className={`${classes.upgradebtn} ${classes.redbtn}`}>Use Free</Button> )}
                </div>
            </div>
      </div>
      <div className={classes.container1} style={{ textAlign: 'center'}}>
        <p className={classes.para}>
          <span>Note:</span> Discounts are available for Veterans and Senior Citizens. Please reach out to PremieRx4Free to discuss those options. 
        </p>   
      </div>
    </div>
  );
};

export default TeamInfo;
