import { useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import useStyles from "./styles"
import { useAuth } from "../../../../contexts/auth.context";
import { generateUrlFriendlyString } from "../../../../helpers/global";
import { useSnackbar } from "notistack";

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

interface AgentSubHeaderProps {
}

const AgentSubHeader = (props: AgentSubHeaderProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const classes = useStyles();

  const copyLink = useCallback(() => {
    const url = `${window.location.origin}/r/${user?.agentProfile?.agentId}-${generateUrlFriendlyString(user?.agentProfile?.name ?? '')}`
    navigator.clipboard.writeText(url)
    enqueueSnackbar("Link copied to clipboard", { variant: "success" })
  }, [user])

  return (
    <div className={`${classes.classes.mainConatiner} row`}>
      <div className="col-lg-6 col-sm-12">
        <div className={classes.classes.subcontainer}>
          <span>Documents</span>
          <div className={classes.classes.subsubcontainer}>
            <a target='_blank' href={user?.agentProfile?.nda} download>NDA</a>
            <div className={classes.classes.line}></div>
            <a target='_blank' href={user?.agentProfile?.contract} download>Commission Agreement</a>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-sm-12">
        <div
          className={` ${classes.classes.subcontainer} ${classes.classes.customit} `}
        >
          <span>Referral Link</span>
          <div className={classes.classes.refercontainer}>
            <img src={"/assets/svg/Dashboard/referrals.svg"} />
            <div className={classes.classes.agentbox}>
              <span>Refer Agent</span>
              <div onClick={copyLink} className={classes.classes.copylinkit}>
                <img src={"/assets/svg/Dashboard/copy-link.svg"} />
                <a>Copy Referral Link </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSubHeader;
