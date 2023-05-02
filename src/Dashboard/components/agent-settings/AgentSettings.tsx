import './styles.css';
import React from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';

interface Props {
    imageUrl: string;
    fullName: string;
    email: string;
    phone: string;
    zip: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    onCancel: () => void;
    onSave: () => void;
}



const AgentSettings: React.FC<Props> = ({
    imageUrl,
    fullName,
    email,
    phone,
    zip,
    currentPassword,
    newPassword,
    confirmNewPassword,
    onCancel,
    onSave,
}) => {
    return (
        <div >
            <span className='textCustom'>Settings</span>
            <div className="box-with-shadow after-it">
                <Row className='row-design'>
                    <Col xs={3} lg={2} className='profile-position' >
                        <Image className="img-in-circle" src={imageUrl} roundedCircle />
                        <div className="edit-icon" style={{

                        }}>
                            <button >
                                <img src='assets/svg/Dashboard/pencil-icon.svg' />
                            </button>
                        </div>
                    </Col>

                    <Col lg={10}>
                        <h3 className="card-title">John Smith</h3>
                        <p className="card-text">johnsmith@gmail.com</p>
                    </Col>

                </Row>
                <div className="form-box">
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" defaultValue={fullName} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" defaultValue={email} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="tel" defaultValue={phone} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="zip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" defaultValue={zip} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Form.Group controlId="currentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" defaultValue={currentPassword} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" defaultValue={newPassword} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="confirmNewPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" defaultValue={confirmNewPassword} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='align-it-end'>
                        <Col lg={2} className="Btn-Custom">
                            <Button variant="secondary" type="button" onClick={onCancel}>
                                Cancel
                            </Button>
                        </Col>
                        <Col lg={2} className="Btn-Custom">
                            <Button variant="primary" type="submit" onClick={onSave}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};


export default AgentSettings;