import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles.css';

const CookieBanner: React.FC = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleAccept = () => {
        // Add your accept logic here
        setShow(false);
    };

    return (
        <>
            {show && (
                <div className="cookie-banner-overlay">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>
                                <img src={'/assets/svg/logo-black.svg'} alt="Logo" />
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Cookie Policy</h4>
                            <p>By using this website, you agree to the use of cookies and similar technologies for the purposes described in this Cookie Policy. Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners.</p>
                            <div  className="cookie-banner-btns">
                                <Button variant="secondary" onClick={handleClose} className='buttonWhite'>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleAccept} className='buttonBlue'>
                                    Accept
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </div>
            )}
        </>
    );
};

export default CookieBanner;
