import useStyles from '../../Plans/components/styles';
import { useState } from 'react';
// @ts-ignore
import CaseStudy1 from '../../../../../assets/images/case_study_1.png';
// @ts-ignore
import CaseStudy2 from '../../../../../assets/images/case_study_2.png';
// @ts-ignore
import CaseStudy3 from '../../../../../assets/images/case_study_3.png';

function TeamInfo(): JSX.Element {
  const { classes } = useStyles();
  const [isHovered, setIsHovered] = useState({
    premium: false,
    standard: false,
    noPlan: false,
  });

  const handleMouseLeave = (column: string) => {
    setIsHovered((prevState) => {
      return {
        ...prevState,
        [column]: false,
      };
    });
  };
  return (
    <div className={classes.containsPage}>
      <img className={classes.caseStudy} src={CaseStudy1} />
      <img className={classes.caseStudy} src={CaseStudy2} />
      <img className={classes.caseStudy} src={CaseStudy3} />
    </div>
  );
}

export default TeamInfo;
