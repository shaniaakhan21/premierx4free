import './adminSettingStyles.css';
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



function AdminSettings(): JSX.Element {
    return (
        <div className='settings-container'>
            <span className='textCustom'>Settings</span>
            <div className="mainBox">
                <Row className='row-design'>
                    <Col xs={3} lg={2} className='profile-position' >
                        <Image className="img-in-circle" src='/assets/svg/Dashboard/dummy.svg' roundedCircle />
                        <div className="edit-icon" style={{

                        }}>
                            <button >
                                <img src='assets/svg/Dashboard/pencil-icon.svg' />
                            </button>
                        </div>
                    </Col>

                    <Col lg={10} className='card-container'>
                        <h3 className="card-title">John Smith</h3>
                        <p className="card-text">johnsmith@gmail.com</p>
                    </Col>

                </Row>
                <div className="form-box">
                    <div className='form-box-firstPart'>
                        <div className='form-box-field'>
                            <Form.Group controlId="fullName">
                                <Form.Label className='form-box-lable1'>Full Name</Form.Label>
                                <Form.Control type="text" defaultValue='Edwin Zam' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                        <div className='form-box-field'>
                            <Form.Group controlId="email">
                                <Form.Label className='form-box-lable1'>Email Address</Form.Label>
                                <Form.Control type="email" defaultValue='JhonSmith@gmail.com ' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                    
    
                        <div className='form-box-field'>
                            <Form.Group controlId="phone">
                                <Form.Label className='form-box-lable1'>Phone Number</Form.Label>
                                <Form.Control type="tel" defaultValue='9987665945' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                        <div className='form-box-field'>
                            <Form.Group controlId="zip">
                                <Form.Label className='form-box-lable1'>Zip Code</Form.Label>
                                <Form.Control type="text" defaultValue='56690' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                    </div>

                    


                    <div className='form-box-firstPart'>
                    <div className='horizontalLine'>
                        <hr />
                    </div>
                        <div className='form-box-field-top'>
                            <Form.Group controlId="currentPassword">
                                <Form.Label className='form-box-lable2'>Current Password</Form.Label>
                                <Form.Control type="password" defaultValue='abc@123' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                    
                    
                        <div className='form-box-field'>
                            <Form.Group controlId="newPassword">
                                <Form.Label className='form-box-lable2'>New Password</Form.Label>
                                <Form.Control type="password" defaultValue='abcd@123' className='form-box-inputArea'/>
                            </Form.Group>
                        </div>
                        <div className='form-box-field'>
                            <Form.Group controlId="confirmNewPassword">
                                <Form.Label className='form-box-lable2'>Confirm Password</Form.Label>
                                <Form.Control type="password" defaultValue='abcd@123' className='form-box-inputArea' />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='form-box-buttonContainer'>
                        <div>
                            <button className='form-box-cancelButton'  onClick={() => {}}>
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button className='form-box-saveButton' onClick={() => {}}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminSettings;