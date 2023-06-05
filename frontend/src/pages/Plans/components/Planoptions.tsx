import useStyles from '../../Plans/components/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Trans, useTranslation } from "react-i18next";

function TeamInfo(): JSX.Element {
  const { classes } = useStyles();
  const [isHovered, setIsHovered] = useState({
    premium: false,
    standard: false,
    noPlan: false,
  });
  const [tr] = useTranslation();

  const t = (key: string) => tr(`plan.${key}`);

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
        <div className={`${classes.col} ${classes.firstCol}`}>
          <div className={`${classes.row} ${classes.borderNo}`}><h6 style={{ opacity: 0 }}>Hi</h6></div>
          {[0, 1, 2, 3, 4, 5].map(key => <div key={key} className={classes.row}><h6 className={classes.h6}>{t(`option[${key}]`)}</h6></div>)}
        </div>
        <div className={`${classes.col} ${classes.secondcol}`} onMouseEnter={() => handleMouseEnter('premium')}
             onMouseLeave={() => handleMouseLeave('premium')}>
          <div className={classes.row}><h6 className={classes.h6} style={{ fontWeight: 'bold' }}>Premium Pack</h6></div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="check"
                                                                                     className={classes.check} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}  ${classes.btnp}`}>
            {isHovered.premium && (<Button variant="primary" className={classes.upgradebtn}>{t('upgrade')}</Button>)}
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
        <div className={classes.col} onMouseEnter={() => handleMouseEnter('noPlan')}
             onMouseLeave={() => handleMouseLeave('noPlan')}>
          <div className={classes.row}><h6 className={classes.h6} style={{ fontWeight: 'bold' }}>Current Plan</h6></div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6 className={classes.h6} style={{
            color: 'red',
            fontWeight: 'bold'
          }}>Few</h6></div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times"
                                                                                     className={classes.times} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times"
                                                                                     className={classes.times} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times"
                                                                                     className={classes.times} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times"
                                                                                     className={classes.times} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo}`}><h6><FontAwesomeIcon icon="times"
                                                                                     className={classes.times} /></h6>
          </div>
          <div className={`${classes.row} ${classes.borderNo} ${classes.btnp}`}>
            {isHovered.noPlan && (
              <Button variant="secondary" className={`${classes.upgradebtn} ${classes.redbtn}`}>{t('use-free')}</Button>)}
          </div>
        </div>
      </div>
      <div className={classes.container1} style={{ textAlign: 'center' }}>
        <p className={classes.para}>
          <Trans>
            <span>Note:</span> {t('note')}
          </Trans>
        </p>
      </div>
    </div>
  );
}

export default TeamInfo;
