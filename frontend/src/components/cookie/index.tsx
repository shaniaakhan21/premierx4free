import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './styles.css';
import { useAuth } from "../../contexts/auth.context";
import { useLocalStorageState } from "../../hooks/useStoredState";

const CookieBanner: React.FC = () => {
  const { user } = useAuth()
  const [cookieAccepted, setCookieAccepted] = useLocalStorageState('cookieAccepted', false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (user) {
      setCookieAccepted(true)
    }
  }, [user]);

  useEffect(() => {
    if (cookieAccepted) {
      setShow(false)
    }
  }, [cookieAccepted]);

  if (!show) {
    return null;
  }

  return (
    <div className="cookie-banner-overlay">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <img src={'/assets/svg/logo-black.svg'} alt="Logo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Cookie Policy</h4>
          <p>By using this website, you agree to the use of cookies and similar technologies for the purposes described
            in this Cookie Policy. Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work more efficiently, as well as to provide information to the
            website owners.</p>
          <div className="cookie-banner-btns">
            <Button variant="secondary" onClick={() => setShow(false)} className='buttonWhite'>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setCookieAccepted(true)} className='buttonBlue'>
              Accept
            </Button>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default CookieBanner;
