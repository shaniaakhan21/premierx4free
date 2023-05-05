import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useStyles from "./styles"

interface PopupProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  content: JSX.Element;
}

const Popup = ({ show, onClose, onSave, title, content }: PopupProps) => {
    const classes = useStyles();
  return (
    <Modal show={show} onHide={onClose} className={classes.classes.boxModal}>
      <Modal.Header className={classes.classes.modalHeader}>
        <Modal.Title className={classes.classes.modalTitle}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer className={classes.classes.modalFooter}>
        <Button variant="secondary" onClick={onClose} className={classes.classes.buttonWhite}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave} className={classes.classes.buttonBlue}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface AgentSubHeaderProps {}

const AgentSubHeader = (props: AgentSubHeaderProps): JSX.Element => {
  const classes = useStyles();
  const [showNdaPopup, setShowNdaPopup] = useState(false);
  const [showCaPopup, setShowCaPopup] = useState(false);
  

  const handleNdaClick = () => {
    setShowNdaPopup(true);
  };

  const handleCaClick = () => {
    setShowCaPopup(true);
  };

  const handleNdaSave = () => {
    setShowNdaPopup(false);
  };

  const handleNdaCancel = () => {
    setShowNdaPopup(false);
  };

  const handleCaSave = () => {
    setShowCaPopup(false);
  };

  const handleCaCancel = () => {
    setShowCaPopup(false);
  };

  return (
    <div className={`{ ${classes.classes.mainConatiner} "row" `}>
      <div className="col-6">
        <div className={classes.classes.subcontainer}>
          <span>Documents</span>
          <div className={classes.classes.subsubcontainer}>
            <a onClick={handleNdaClick}>NDA</a>
            <div className={classes.classes.line}></div>
            <a onClick={handleCaClick}>Commission Agreement</a>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div
          className={` ${classes.classes.subcontainer} ${classes.classes.customit} `}
        >
          <span>Referral Link</span>
          <div className={classes.classes.refercontainer}>
            <img src={"/assets/svg/Dashboard/referrals.svg"} />
            <div className={classes.classes.agentbox}>
              <span>Refer Agent</span>
              <div className={classes.classes.copylinkit}>
                <img src={"/assets/svg/Dashboard/copy-link.svg"} />
                <a href="#">Copy Referral Link </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        show={showNdaPopup}
        onClose={handleNdaCancel}
        onSave={handleNdaSave}
        title={"Upload NDA Documents"}
        content={<textarea placeholder="Sign in here" className={classes.classes.areaCustom}></textarea>}
      />
        <Popup
        show={showCaPopup}
        onClose={handleCaCancel}
        onSave={handleCaSave}
        title={"Upload Commission Agreement Documents"}
        content={<textarea placeholder="Sign in here" className={classes.classes.areaCustom}></textarea>}
      />
    </div>
  );
};

export default AgentSubHeader;
